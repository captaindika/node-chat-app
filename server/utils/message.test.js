var expect = require('expect')
var {generateMessage, generateMessageLocation} = require('./message')
describe('function generate message', () => {
  it('should return from, text, and createdAt', () => {
    var from = 'Jen'
    var text = 'Some message'
    var message = generateMessage(from, text)
    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({
      from,
      text
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