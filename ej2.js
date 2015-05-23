function agenda (titulo, inic) {
  var _titulo = titulo;
  var _contenido = inic;
 
  return {
    titulo: function()                    { return _titulo; },
    meter:  function(nombre, tf) { _contenido[nombre]=tf; },
    tf:     function(nombre)         { return _contenido[nombre]; },
    borrar: function(nombre)     { delete _contenido[nombre]; },
    toJSON: function()              { return JSON.stringify(_contenido);},
    listar:(function(){
      //Inicializo la salida a vacío
      var salida="";
      //Recorro los elementos del objeto iterando por sus claves
      for(var i in _contenido){
        salida+=i+", "+_contenido[i]+"\n";
      }
      //Devuelvo el String resultante
      return salida;
    })
  }
}
var amigos = agenda ("Amigos",
             { Pepe: 113278561,
               José: 157845123,
               Jesús: 178512355
             });

//Mostramos la lista generada
console.log(amigos.listar());