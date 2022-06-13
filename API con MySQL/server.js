const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./models');

db.sequelize.sync({force:false}).then(()=>{
    console.log('Sync database')
})

/* opciones de cors */

var corsOption = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//ruta simple de acceso
app.get("/", (req, res) =>{
    req.json({message:"Bienvenidos"})
})

//incluir archivos de ruta
require('./ routes/authorroutes')(app);

//definimos el puerto
app.listen(3001, () => {

    console.log("http://localhost:3001");

});