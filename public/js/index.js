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
      var li = (message.color.toLowerCase() === 'black' ? jQuery(`<li style="color: ${message.color};"></li>`) : 
      jQuery(`<li style="color: ${message.color}; font-weight:bold; font-size:20"></li>`))
      li.text(`${message.from}: ${message.text}`)

      jQuery('#messages').append(li)
    })

    socket.on('sendLocation', (coords) => {
      console.log('location', coords)
      var link = jQuery(`<a href="http://www.google.com/maps/place/${coords.latitude},${coords.longitude}">My Location</a>`)
      var li = jQuery('<li>',{link},'</li>')
      jQuery('#messages').append(li.append(link))
    })

    jQuery('#message-form').on('submit', (e) => {
      e.preventDefault()

      socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
      }, () => {

      })
    })

    var locationButton = jQuery('#send-location')
    locationButton.on('click', () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          socket.emit('location', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
          console.log(`here is your position: \n
          longitude: ${position.coords.longitude}\n
          latitude: ${position.coords.latitude}`)
        }, () => {
          alert('Unable fetch your location, permission needed !')
        })
      } 
      else{
        return alert('It doesnt work')
      } 
    })