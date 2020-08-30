var expect = require('expect')
var moment = require('moment')
var date = moment()
var {generateMessage, generateMessageLocation} = require('./message')
describe('function generate message', () => {
  it('should return from, text, and createdAt', () => {
    var from = 'Jen'
    var text = 'Some message'
    var timestamp = date.format('dddd MMMM YYYY')
    var message = generateMessage(from, text, 'black', timestamp)
    expect(typeof message.timestamp).toBe('string')
    expect(message).toMatchObject({
      from,
      text,
      timestamp
    })
  })
})

describe('function generate message location', () => {
  it('should return from, longitude and latitude', () => {
    var from = 'admin'
    var position = {
      longitude: 1,
      latitude: 1
    }

    var locationMessage = generateMessageLocation(from, position)
    expect(typeof locationMessage.from).toBe('string')
    expect(typeof locationMessage.latitude).toBe('number')
    expect(typeof locationMessage.longitude).toBe('number')
    expect(locationMessage).toMatchObject({
      from,
      longitude: position.longitude,
      latitude: position.latitude
    })
  })
})