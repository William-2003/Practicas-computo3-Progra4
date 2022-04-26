/* listar las empresas que utilizan NodeJs */

const {empresas, edades} = require('./listas');

console.log("Las empresas que utilizan NodeJs para su desarrollo son: _________________________________________");

empresas.forEach((empresas)=>{
    console.count(empresas);
})