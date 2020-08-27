const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const { create } = require('domain')
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
      body: 'welcome to the server'
    })

    // socket broadcast emit from admin to new user joined
    socket.broadcast.emit('welcome', {
      from: 'Admin',
      text:'new user joined',
      createdAt: `new user joined at ${new Date().getTime()}`
    })

  socket.on('createMessage', (message) => {
    console.log(`createMessage: ${JSON.stringify(message)}`);
    io.emit('send', {
      from: message.from,
      body: message.body,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
}) 
server.listen(port, () => {
  console.log(`server run on port ${port}`)
})