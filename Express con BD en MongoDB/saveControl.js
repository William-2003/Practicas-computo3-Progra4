const fs = require('fs')


const  escribir =(_fullname,_email,_password)=>{

    // leer el archivo 
    fs.readFile('usersData.js',(err, data)=>{
        if(err){
            throw err
        }
        var datos_text = data.toString()
        //var datos_array = datos_text.split('\n')
        var marca = 0

        //lee el texto de final a inicio para saber donde termina el array de los dato
        for(var i = datos_text.length; i >= 0 ; i -- ){

            if(datos_text[i]=== "]" ){
                marca = i
                //console.log("\n salir \n",marca)
                break
            }    
        
        }

        //prepara el dato para ser guardado 
        var corte = datos_text.slice(0,marca-1)// corta el texto a donde termina el array
        var new_dato = ", \n { \n fullname:'"+_fullname+"', \n email:'"+_email+"', \n password:'"+_password+"' \n } " // guarda el los datos ingresado como un diccionario de texto
        var datos = corte+new_dato+"]; \n module.exports = { data }" //une todo para que sea guardado todo como texto
        
       // console.log(datos)

       // escribe en la pagina de datos 
        fs.writeFile('usersData.js',datos,(err)=>{
            if(err){
                throw err
            }
        })
        /*
        var new_dato = {
            fullname:_fullname,
            email:_email,
            password:_password
        }
        
        var conte_new_dato = new_dato.split('\n')
        
        
        conte_new_dato.forEach(dato =>{
            datos_array.splice(marca,0,dato)  
        })

        */
        //datos_array.splice(marca,0,new_dato.split('\n'))
        //console.log(datos_array)

        //fs.writeFile('usersData.js')

    })

}

//escribir("a","b","c")
module.exports = {escribir}