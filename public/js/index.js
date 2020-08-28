var socket = io();
    socket.on('connect', () => {
      console.log('connected to server')
    })

    socket.on('disconnect', () => {
      console.log('disconnected to server')
    })

    socket.on('send', (message) => {
      console.log('New message:', message)
    })

    socket.on('welcome', (message) => {
      console.log(`welcome chat: ${JSON.stringify(message)}`)
    })

    // socket.emit('createMessage', {
    //   from: 'DK',
    //   text: 'Hi'
    // }, (message) => {
    //   console.log('it works, ',message)
    // })

    socket.on('welcome', (message) => {
      console.log('ini welcome : ',message)
      var h3 = jQuery('<h3></h3>')
      h3.text(`${message.text}`)
      jQuery('#welcoming').append(h3)
    })
    
    socket.on('send', (message) => {
      console.log('send: ',message)
      var li = jQuery('<li></li>')
      li.text(`${message.from}: ${message.text}`)

      jQuery('#messages').append(li)
    })

    jQuery('#message-form').on('submit', (e) => {
      e.preventDefault()

      socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
      }, () => {

      })
    })