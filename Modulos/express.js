var express = require('express');
var app = express();

//mediante el require se hace el llamado al modulo

//hacer una deficion de ruta cuando se haga la peticion get
app.get('/', function(req, res){
    res.send("Programacion COmputacional IV")
});

//definir, crear el servidor y definir el puerto de conexion de escucha
app.listen(8080, function(){
    console.log("Aplicacion de ejemplo con Express ejecutandose en el puerto 8080")
})