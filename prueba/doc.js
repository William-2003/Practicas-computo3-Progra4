
const fs = require('fs'); //modulo nativo del sistema
const readline = require('readline');
const util = require('util');
var sy = require('csv-stringify');



//crear una interfaz para el modulo para los procesos de stdin y stdout
var rl = readline.createInterface(process.stdin, process.stdout);

//arreglo que almacenara los datos 
var persona = {
    nombre:"",
    comentarios: [],

}



/* Hacemos una pregunta para obtener una respuesta y maipularla */
rl.question('¿Cual es tu nombre?  ', (respuesta) =>{
    //se asigna la respuesta recibida a la variable nombre
    persona.nombre = respuesta;

    rl.setPrompt('Dime un comentario: ');
    rl.prompt();

    /* console.log(`Hola ${respuesta} !!`);
    process.exit();//finalizar el proceso. */
});




//mapear cada vez que se escriba en la linea de comandos para evitar escribir multiples funciones
rl.on('line', (input)=>{
    /* console.log("Escribiste una linea..") */


    //detener la ejecucion de consulta
    if(input.trim() === 'no' || input.trim() === 'salir'){
        var mensaje = util.format("Te llamas %s y esto fue lo que me dijiste %j ", persona.nombre, persona.comentarios);
        console.log(mensaje);
        var salida = JSON.stringify(persona);
        var tojson = JSON.parse(salida);
        console.log(tojson);
        console.log(`La salida del JSON es ${tojson}.`);
        

        /* llamado a la funcion para la transformacion a .CSV */

        //escribir un archivo de JS a .csv
        
        sy.stringify(tojson,{
            Header: true
        }, function(err, output){
            fs.writeFileSync('./dataDATA.csv', output);
        })

        process.exit();
    }

    //hacer una nueva consulta
    persona.comentarios.push(input.trim());
    rl.setPrompt('Tienes otro comentario? : ');
    rl.prompt();
});



