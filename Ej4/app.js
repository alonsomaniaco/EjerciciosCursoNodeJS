/**
*
* Construir una aplicación de servidor con express que tenga 2 páginas diferentes, enlazadas entre sí con el siguiente comportamiento:
 
Página 1: Será la página de entrada de la aplicación y tendrá un título y 2 preguntas: 
¿Quién descubrió América? y ¿Capital de Portugal?. Cada pregunta tendrá un formulario asociado, con un cajetín de entrada y un botón de envío, que permitirá enviar la respuesta a esa pregunta en particular (es decir habrá 2 formularios en la página). Cada formulario tendrá además un parámetro oculto que envíe un valor diferente que indique al servidor a que pregunta está contestando el cliente. 
 
La página 1 estará asociada a la transacción HTTP:  GET /preguntas
 
Página 2: Será la página que muestre la respuesta a la que está contestando el cliente , e indicará si ha contestado correctamente o no con una frase correctamente construida. En caso de contestar incorrectamente, le indicará además cual es la respuesta correcta. La página incluirá además un enlace asociado al texto “Volver a la página inicial”, que permita volver a la página 1. 
 
La página 2 estará asociada a la transacción HTTP:  GET /respuesta
 
La aplicación debe utilizar solo el paquete express (no utilizar express-generator). Entregar en un fichero adjunto en la entrega el programa con el código del programa solicitado.
 
El evaluador debe descargarlo, en un direcorion con express instalado y comprobar con un navegadoror que funciona correctamente.
*
**/

try{
	var app = require('./node_modules/express/lib/express')();

	app.get('/preguntas',function(req, res){
		//Enviar HTML de las preguntas
		res.send("<!DOCTYPE html>"
			+"<html>"
				+"<head>"
					+"<title>Formulario de preguntas</title>"
					+"<meta charset='utf-8'>"
				+"</head>"
				+"<body>"
					+"<legend><h2>Formulario de preguntas</h2></legend>"
					+"<form action='/respuesta' method='get' accept-charset='utf-8'>"
						+"<label>¿Quién descubrió América?</label>"
						+"<input type='text' name='respuesta' value=''>"
						+"<input type='submit' value='Enviar'>"
						+"<input type='hidden' name='pregunta' value='1'>"
					+"</form>"
					+"<br/>"
					+"<form action='/respuesta' method='get' accept-charset='utf-8'>"
						+"<label>¿Capital de Portugal?</label>"
						+"<input type='text' name='respuesta' value=''>"
						+"<input type='submit' value='Enviar'>"
						+"<input type='hidden' name='pregunta' value='1'>"
					+"</form>"
				+"</body>"
			+"</html>");
	});

	app.get('/respuesta',function(req, res){
		//Procesar respuesta del formulario
		var respuesta=req.query.respuesta;
		var txtResp="";
		switch(req.query.pregunta){
			case "1":
				if(respuesta.toLowerCase()=="colón"){
					txtResp="Respuesta Correcta";
				}else{
					txtResp="Respuesta incorrecta, la respuesta correcta es Colón.";
				}
				break;
			case "2":
				if(respuesta.toLowerCase()=="lisboa"){
					txtResp="Respuesta Correcta";
				}else{
					txtResp="Respuesta incorrecta, la respuesta correcta es Lisboa.";
				}
				break;
			default:
				txtResp="Datos recibidos no válidos";
				break;
		}
		res.send(txtResp);
	});

	app.listen(8000);	
}catch(e){
	console.error(e);
}