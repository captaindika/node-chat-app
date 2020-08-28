const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {generateMessage, generateMessageLocation} = require('./utils/message')
// const { create } = require('domain')
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
    from: 'Admin',
    text: 'Cieeeee gabut nih !!!'
  })
    
    // socket broadcast emit from admin to new user joined
    socket.broadcast.emit('send', generateMessage('Server', 'New user joined', 'red'))

    socket.on('createMessage', (message, callback) => {
      console.log(`createMessage: ${JSON.stringify(message)}`)
      io.emit('send', generateMessage(message.from, message.text))
      callback('this is from server')
    })

    socket.on('location', (coords) => {
      io.emit('sendLocation', generateMessageLocation('User', coords))
    })

    socket.on('disconnect', () => {
      console.log('User was disconnected')
      socket.broadcast.emit('send', generateMessage('Server', 'User disconnected', 'red'))
    })
}) 
server.listen(port, () => {
  console.log(`server run on port ${port}`)
})