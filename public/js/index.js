// const message = require("../../server/utils/message");

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
      const style = `font-family: Comic Sans MS,
                    cursive, sans-serif;
                    font-size: 24px;
                    letter-spacing: -3px;
                    word-spacing: 4px; 
                    color: #5EC9DB;
                    font-weight: normal;
                    text-decoration: none;
                    font-style: italic;
                    font-variant: small-caps;
                    text-transform: capitalize;`
      var title = jQuery(`<li style=\"${style}\"></li>`)
      title.text(`${message.from} : ${message.text}`)
      jQuery('#messages').append(title)
    })
    
    socket.on('send', (message) => {
      console.log('send: ',message)
      var li = (message.color.toLowerCase() === 'black' ? jQuery(`<li style="color: ${message.color};"></li>`) : 
      jQuery(`<li style="color: ${message.color}; font-weight:bold; font-size:20"></li>`))
      var a = jQuery('<a style="display: flex; justify-content: flex-end; color:grey; font-weight:bold; font-size:13px;"></a>')
      a.text(`<${message.createdAt}>`)
      li.text(`${message.from}: ${message.text}`)
      jQuery('#messages').append(li.append(a))
    })

    socket.on('sendLocation', (coords) => {
      console.log('location', coords)
      var link = jQuery(`<a target="_blank" href="http://www.google.com/maps/place/${coords.latitude},${coords.longitude}">My Location</a>`)
      var li = jQuery('<li>',{link},'</li>')
      li.text(`${coords.from}: `)
      jQuery('#messages').append(li.append(link))
    })

    jQuery('#message-form').on('submit', (e) => {
      e.preventDefault()
      var messageTextbox = jQuery('[name=message]')
      socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val(),
      }, () => {
        messageTextbox.val('')
      })
    })

    var locationButton = jQuery('#send-location')
    locationButton.on('click', () => {
      if(navigator.geolocation) {
        locationButton.attr('disabled', 'disabled').text('Sending Location')
        navigator.geolocation.getCurrentPosition( (position) => {
          setTimeout( () => {
            locationButton.removeAttr('disabled').text('Share Location')
            socket.emit('location', {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            }) 
          }, 3000)
          console.log(`here is your position: \n
          longitude: ${position.coords.longitude}\n
          latitude: ${position.coords.latitude}`)
        }, () => {
          locationButton.removeAttr('disabled')
          alert('Unable fetch your location, permission needed !')
        })
      } 
      else{
        return alert('It doesnt work')
      } 
    })