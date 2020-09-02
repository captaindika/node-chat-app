const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {generateMessage, generateMessageLocation} = require('./utils/message')
const { Socket } = require('dgram')
const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 5000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')
 
  // socket emit from admin text welcome to the chat app
  socket.emit('welcome', {
    from: 'Server',
    text: 'Welcome to the gabut chat !!!'
  })
  
  socket.on('end', () => {
    socket.close()
  })
  socket.emit('newMessage', generateMessage('Server', 'Welcome to The Gabut Chat', 'black', 'bold'))
    // socket broadcast emit from admin to new user joined
    socket.broadcast.emit('newMessage', generateMessage('Server', 'New user joined', 'red', 'bold'))

    socket.on('createMessage', (message, callback) => {
      console.log(`createMessage: ${JSON.stringify(message)}`)
      io.emit('newMessage', generateMessage(message.from, message.text))
      callback()
    })

    socket.on('location', (coords) => {
      io.emit('sendLocation', generateMessageLocation('User', coords))
    })

    socket.on('disconnect', () => {
      console.log('User was disconnected')
      socket.broadcast.emit('newMessage', generateMessage('Server', 'User disconnected', 'red', 'bold'))
    })
}) 
server.listen(port, () => {
  console.log(`server run on port ${port}`)
})
