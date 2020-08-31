var moment = require('moment')
moment.locale('id')
var generateMessage = (from, text, color) => {
  var date = new Date()
  // convert time to GMT +7 heroku server, comment below for use server time
  var convertDate = moment(date).add(7,'h').format('dddd, D MMMM YYYY h:mm:ss a')
 return {
    from,
    text,
    color: color || 'black',
    createdAt: convertDate
 }
}

var generateMessageLocation = (from, position) => {
  return {
    from,
    latitude: position.latitude,
    longitude: position.longitude
  }
}

module.exports = {
  generateMessage,
  generateMessageLocation
}