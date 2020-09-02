var moment = require('moment')
moment.locale('id')
// var date = new Date().getTime()
var generateMessage = (from, text, color, bold) => {
  var date = moment().valueOf()
  // convert time to GMT +7 heroku server, comment below for use server time
  var convertDate = moment(date).utcOffset("+07:00").format('dddd, D MMMM YYYY h:mm:ss a z+7')
 return {
    from,
    text,
    color: color || 'black',
    createdAt: moment().utcOffset("+07:00").calendar(),
    bold: bold || 'normal'
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