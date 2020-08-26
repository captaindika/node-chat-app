const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 5000

var app = express()
var server = http.createServer(app)
var socket = socketIO(server)


app.use(express.static(publicPath))

socket.on('connection', (socket) => {
  console.log('New user connected')
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
}) 
server.listen(port, () => {
  console.log(`server run on port ${port}`)
})