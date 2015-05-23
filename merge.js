try{
	var fs=require("fs");


	if(process.argv.length<3){
		console.info('Argumentos insuficientes, el uso es node merge.js fich1 fich2 .... fichN');
		process.exit();
	}

	for (var i = 2; i < process.argv.length; i++) {
		var nomFichero=process.argv[i];
		fs.readFile(nomFichero,function(err,datos){
			if(err){
				console.error(err);
			}else{
				datos+="\n\n";
				fs.appendFile("./dest",datos,function(err2){
					if(err2){
						console.error(err2);
					}
				});
			}
		});
	};
}catch(e){
	console.error(e);
}