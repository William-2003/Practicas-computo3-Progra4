//referenciamos al modulo creado para invocarlo

/* const modulo = require("./function")
console.log(modulo.propiedad);
modulo.saludar();



//modlos del core
var data = [
    {
        a: 35,
        b: 25
    },
    {
        a: 35,
        b: 25 
    }
];

console.log(data);
console.table(data);


//mostrar en consola por grupos
console.group('Bloque');
console.log("hola");
console.log("hola");
console.log("hola");
console.log("hola");
console.log("hola");
console.groupEnd('Bloque'); */


/* var parse = require('csv-parse'); //aceptara un objeto literal 

//se utilizara para acceder a los registros
var parser = parse.parse({columns:true}, function(err, records){
    console.log(records);
})
 */


//se abre un flujo del lectura con CreateWriteStream 
/* fs.createReadStream('./lista.csv').pipe(parser); */



var fs = require('fs'); /* modulo nativo de sistema  
SE HACE ESTA ESTRUCTURA DE IMPORTACION SOLO PARA MODULOS*/ 
var somedata =[
    {
        "country": "El Salvador",
        "Official Languaje": "Spanish"
    },
    {
        "country": "United States",
        "Official Languaje": "English"
    },
    {
        "country": "Francia",
        "Official Languaje": "Frances"
    },
    {
        "country": "Brazil",
        "Official Languaje": "Portugues"
    }
]


//escribir un archivo de JS a .csv
var stringify = require('csv-stringify');
stringify.stringify(somedata,{
    Header: true
}, function(err, output){
    fs.writeFileSync('./data.csv', output);
})
