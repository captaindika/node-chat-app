// const message = require("../../server/utils/message");

var socket = io();
    const scrollToBottom = () => {
      // selector
      var messages = jQuery('#messages')
      var newMessage = messages.children('li:last-child')
      //height
      var clientHeight = messages.prop('clientHeight')
      var scrollTop = messages.prop('scrollTop')
      var scrollHeight =messages.prop('scrollHeight')
      var newMessageHeight = newMessage.innerHeight()
      var lastMessageHeight = newMessage.prev().innerHeight()

      if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
        messages.scrollTop(scrollHeight)
      
      }
    }
    socket.on('connect', () => {
      var params = jQuery.deparam(window.location.search)
      socket.emit('joinChat', params, (err) => {
        if (err) {
          alert(err)
          window.location.href = '/'
        } else {
          alert(`Welcome in ${params.room} room, ${params.name} ! \n Enjoy GabutChat !`)
          console.log('Success')
        }
      })
    })

    socket.on('disconnect', () => {
      console.log(`you're out`)
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

    socket.on('newMessage', (message) => {
      if (message.text) {  
        var template = jQuery('#message-template').html()
        var html = Mustache.render(template, {
          from: message.from,
          text: message.text, 
          createdAt: message.createdAt,
          color: message.color,
          bold: message.bold || 'normal'
        })
        jQuery('#messages').append(html)
        scrollToBottom()  
      } else {
        var sendButton = jQuery('[name=sendButton]')
        var messageBox = jQuery('[name=message]')
        var locationButton = jQuery('#send-location')
        messageBox.attr('disabled', 'disabled')
        sendButton.attr('disabled', 'disabled').text('Cant send')
        locationButton.attr('disabled', 'disabled')
        var li = jQuery(`<li style="color:red;font-weight:bold;"></li>`)
        li.text('Message cant be empty !!!, wait 10 second for sending new message')
        jQuery('#messages').append(li)
        setTimeout( () => {
          sendButton.removeAttr('disabled').text('Send')
          messageBox.removeAttr('disabled')
          locationButton.removeAttr('disabled')              
        }, 10000)
      }
    })

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
      if (message.text) {
        console.log('send: ',message)
        var li = jQuery(`<li style="color: ${message.color};"></li>`)
        var a = jQuery('<a style="display: flex; justify-content: flex-end; color:grey; font-weight:bold; font-size:13px;"></a>')
        a.text(`<server time - ${message.createdAt}>`)
        li.text(`${message.from}: ${message.text}`)
        jQuery('#messages').append(li.append(a))
      } else {
        var sendButton = jQuery('[name=sendButton]')
        var messageBox = jQuery('[name=message]')
        messageBox.attr('disabled', 'disabled')
        sendButton.attr('disabled', 'disabled').text('Cant send')
        var li = jQuery(`<li style="color:red;font-weight:bold;"></li>`)
        li.text('Message cant be empty !!!, wait 10 second for sending new message')
        jQuery('#messages').append(li)
        setTimeout( () => {
          sendButton.removeAttr('disabled').text('Send')
          messageBox.removeAttr('disabled')              
        }, 10000)
      }

      // var time = moment.locale('id')(message.createdAt).zone('+07:00').format('h:mm a') 
      // var template = jQuery('#message-template').html()
      // var html = Mustache.render(template, {
      //   from: message.from,
      //   text: message.text,
      //   createdAt: time
      // })
      // jQuery('#messages').append(html)

    })

    socket.on('sendLocation', (coords) => {
      console.log('location', coords)
      var link = jQuery(`<a target="_blank" href="http://www.google.com/maps/place/${coords.latitude},${coords.longitude}">My Location</a>`)
      var li = jQuery('<li>',{link},'</li>')
      li.text(`${coords.from}: `)
      jQuery('#messages').append(li.append(link))
      scrollToBottom()
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