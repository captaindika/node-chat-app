var moment = require('moment')
moment.locale('id')
var generateMessage = (from, text, color) => {
  var date = new Date()
  var convertDate = moment(date).format('dddd MMMM YYYY, h:mm:ss a')
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