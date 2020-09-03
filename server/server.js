const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {isRealString} = require('./utils/validation')
const {generateMessage, generateMessageLocation} = require('./utils/message')
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 5000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')
 
  // socket emit from admin text welcome to the chat app
  // socket.emit('welcome', generateMessage('Server', 'Welcome to the gabut-chat', 'red', 'bold'))
  
  socket.on('joinChat', (params, callback) => {
    if ((!isRealString(params.name) || !isRealString(params.room))) {
    
      return callback('Name and room must be filled')
    }
    socket.join(params.room);
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUserList', users.getUserList(params.room))     
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Server', `${params.name} has joined in room ${params.room}`, 'red', 'bold'))

    //
    // socket.broadcast.to(params.room).on('createMessage', (message, callback) => {
    // console.log(`createMessage: ${JSON.stringify(message)}`)
    // io.emit('newMessage', generateMessage(params.name, message.text))  
    callback()
    })

    socket.on('createMessage', (message, callback) => {
      var user = users.getUser(socket.id)
      if (user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        callback()
      } else {
        io.to(user.id).emit('punishment')
        callback()
      }
    })

    // socket.on('location', (message, callback) => {
    //   var user = users.getUser(socket.id)
    //   if (user && isRealString(message.text)) {
    //     io.to(user.room).emit('newMessage', generateMessage(message.from, message.text))
    //   } 
    // })

  socket.emit('newMessage', generateMessage('Server', 'Welcome to The Gabut Chat', 'red', 'bold'))
  // for send to all room
    // socket broadcast emit from admin to new user joined
    // socket.broadcast.emit('newMessage', generateMessage('Server', 'New user joined', 'red', 'bold')) // this for broadcast to all room

    

    socket.on('location', (coords) => {
      var user = users.getUser(socket.id)
      if (user) {
        io.to(user.room).emit('sendLocation', generateMessageLocation(user.name, coords))
      }
    })

    socket.on('disconnect', () => {
      console.log('User was disconnected')
      // socket.broadcast.emit('newMessage', generateMessage('Server', 'User disconnected', 'red', 'bold'))
      var user = users.removeUser(socket.id)
      if (user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room))
        io.to(user.room).emit('newMessage', generateMessage('Server', `${user.name} leave chat`, 'red', 'bold'))
      }
    })
}) 
server.listen(port, () => {
  console.log(`server run on port ${port}`)
})
