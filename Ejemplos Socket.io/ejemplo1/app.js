const { Socket } = require('socket.io');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})


//declaramos vamriable para contar los clientes que se conecten
var numcliente = 0;


//se establece un callback para que cuando se escuche la ejecucion, muestre los mensajes si es que se 
//ejecuta la conexion con el servidor

io.on('connection', (socket) =>{
    numcliente ++ ;
    io.sockets.emit('broadcast',{
        information: numcliente + ' clientes conectados'
    });

    console.log('Un usuario se ha conectado')
    socket.on('disconnect', ()=>{
        numcliente--;
        io.sockets.emit('broadcast',{
            information: numcliente + ' clientes conectados'
        });
    })

    socket.on('clientEvent', (data)=>{
        console.log(data)
    })

    //se establece un tiempo de espera
    setTimeout(()=>{
        socket.send('Mensaje despues de 4 segundos'),
        socket.send('prueba2 de mensajes enviados')
    }, 4000) //se establece el tiempo de conexion)

    socket.on('disconnect', ()=>{
        console.log('Un usuario se ha desconectado')
    })
})

http.listen(3000, ()=>{
    console.log("Escuchando el puerto 3000")
})

