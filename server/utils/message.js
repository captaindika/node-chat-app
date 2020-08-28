var generateMessage = (from, text, color) => {
 return {
    from,
    text,
    color: color || 'black',
    createdAt: new Date().getTime()
 }
}

module.exports = {
  generateMessage
}