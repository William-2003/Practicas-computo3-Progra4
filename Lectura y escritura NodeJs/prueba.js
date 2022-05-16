
//invocacion de los modulos para la app
/* const me = require('./tocsv') */

const readline = require('readline');
const util = require('util');
const csvWrite = require('csv-writer')





//crear una interfaz para el modulo para los procesos de stdin y stdout
var rl = readline.createInterface(process.stdin, process.stdout);

//arreglo que almacenara los datos 
var persona = {
    nombre:'',
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
        console.log(typeof persona)
        console.log(persona);
        /* var salida = JSON.stringify(persona);
        console.log(salida)
        var tojson = JSON.parse(salida);
        console.log(tojson)
        
 */
       /* llamar LA FUNCION PARA LA CONVERSION */
       tocsv(persona);
        

        /* process.exit(); */
    }

    //hacer una nueva consulta
    persona.comentarios.push(input.trim());
    rl.setPrompt('Tienes otro comentario? : ');
    rl.prompt();
});






//FUNCION PARA LA CONVERSION DE JSON A CSV
function tocsv(data){
    var prueba = [data]
    var write = csvWrite.createObjectCsvWriter({
        path:'salida.csv',
        header:[
            {id: 'nombre',title:"Nombre del usuario"},
            {id: 'comentarios',title:"Comentarios recibidos."}
        ]
    })
    write.writeRecords(prueba).then(() => {
        console.log('Se ha converttido la informacion a CSV');
        process.exit();
      });
}


