var generateMessage = (from, text, color) => {
 return {
    from,
    text,
    color: color || 'black',
    createdAt: new Date().getTime()
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