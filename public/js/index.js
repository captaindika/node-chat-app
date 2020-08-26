var socket = io();
    socket.on('connect', () => {
      console.log('connected to server')

      socket.emit('createEmail', {
        to:'dika@frandita.com',
        text: 'Aku ganteng'
      })

      socket.emit('sendMessage', {
        from:'dika ganteng',
        body: 'Halo Dika ganteng'
      })
    })

    socket.on('disconnect', () => {
      console.log('disconnected to server')
    })

    socket.on('newEmail', (email) => {
      console.log('New email', email)
    })