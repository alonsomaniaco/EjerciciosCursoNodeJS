/*
 * modulo4_p2p - Practica MiriadaX Modulo 4
 * Autor: Santiago Romero / sromero at gmail dot org
 * Fecha: 2015-05-23
 */

var express = require('express');
var app = express();

// Array con preguntas y sus respuestas. Usa regexp para permitir
// multiples respuestas válidas, como "Cristobal Colón" o "Colón",
// con o sin acento.
app.locals.preguntas = [
   [ "¿Quién descubrió América?", [ "^Cristobal Col[óo]n", "^Col[óo]n$" ],
                                  [ "Cristobal Colón"] ],
   [ "¿Capital de Portugal?",     [ "^Lisboa$" ], 
                                  ["Lisboa"] ]
                       ];

//---------------------------------------------------------------------                          
// Atender a peticiones get de /preguntas (formulario preguntas)
//---------------------------------------------------------------------                          
app.get('/preguntas', function( req, res ) {

  var out = '<html><body><h1>Preguntas</h1><br />';

  // Construir dinamicamente un formulario para cada pregunta del array
  for( var i=0; i<app.locals.preguntas.length; i++ ) {
    out += '<form method="get" action="/respuesta">' +
    '<input type="hidden" name="id" value="' + i + '" /><br />' +
    '<strong>' + app.locals.preguntas[i][0] + '</strong>&nbsp;' +
    '<input type="text" name="respuesta" value="" /><br /><br />' +
    '<input type="submit" value="Enviar respuesta" />' +
    '</form><br />';
  }
  out += '</body></html>';
  res.send(out);

});


//---------------------------------------------------------------------                          
// Atender a los submits de las respuestas
//---------------------------------------------------------------------                          
app.get('/respuesta', function( req, res, next ) {

  // Si el cliente llega aqui a traves de la URL sin haber
  // realizado un submit en el formulario, lo mandamos a la HOME.
  // Hay que usar return next() (y no solo next()) para salir del
  // middleware actual.
  if( req.query.id == undefined ) {
    res.redirect(302, '/preguntas');
    return next();
  }

  // También hacemos lo mismo si el ID de pregunta es incorrecto
  var id = parseInt( req.query.id );
  if( isNaN(id) || id < 0 || id >= app.locals.preguntas.length ) {
    res.redirect(302, '/preguntas');
    return next();
  }

  var outbegin = "<body><html><h1>Respuesta</h1><br />";
  var outend = "<br /><br /><a href='/preguntas'>&lt;Volver " +
               "al listado de preguntas&gt;</a></body></html>";

  // Comprobar si la respuesta es válida
  var respuesta = req.query.respuesta;
  var resp_validas = app.locals.preguntas[id][1];

  // Iterar las respuestas validas (son expresiones regulares)
  // y ver si la respuesta coincide con algunas de ellas.
  for( var i=0; i<resp_validas.length; i++ ) {

    var re = new RegExp( resp_validas[i], 'i');

    // respuesta acertada: mensaje + End of request + fin de MW.
    if( respuesta.match( re ) != null ) {
      res.send( outbegin + 
                "¡Enhorabuena! ¡'" + respuesta + "' " +
                "era la respuesta correcta!" + outend);
      res.end();
      return;
    }
  }

  res.send( outbegin + 
            "¡Vaya! ¡No has acertado!<br /><br />" +
            "La respuesta correcta era '" +  
            app.locals.preguntas[id][2] + "'." + outend );
  res.end();
  return;
});


//---------------------------------------------------------------------                          
// Un fallback para cualquier otra URL redirije a "/preguntas".
//---------------------------------------------------------------------                          
app.get('*', function( req, res, next ) {
  res.redirect(302, '/preguntas');
  return next();
});

app.listen(8080);

