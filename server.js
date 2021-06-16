const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + "/public"));


server.listen(8080, () => {
  console.log('Servidor escuchando en localhost: 8080')
})

let messages = [
  {
    author: 'Juan',
    text: 'Bienvenidos'
  },
  {
    author: 'El pepe',
    text: 'Buenasss'
  },
]

//Cuando se conecta un cliende emitimos los mensajes guardados
io.on('connection', socket => {
  console.log('Un cliente se ha conectado')
  socket.emit('messages', messages)

  socket.on('newMessage', data => {
    messages.push(data)
    console.log(messages)
    io.sockets.emit('messages', messages)
  })
})