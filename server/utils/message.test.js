var expect = require('expect')
var moment = require('moment')
var date = moment()
var {generateMessage, generateMessageLocation} = require('./message')
var {isRealString} = require('./validation')
describe('function generate message', () => {
  it('should return from, text, and createdAt', () => {
    var from = 'Jen'
    var text = 'Some message'
    var timestamp = moment().calendar()
    var message = generateMessage(from, text, 'black', timestamp)
    expect(typeof message.createdAt).toBe('string')
    expect(message).toMatchObject({
      from,
      text,
      createdAt: timestamp,
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

describe('isRealString validation testing', () => {
  it('should reject non-string values', () => {
    var testFunction = isRealString(30)
    expect(testFunction).toBe(false)
  })
  it('should reject string with only spaces', () => {
    var testFunction = isRealString('   ')
    expect(testFunction).toBe(false)
  })
  it('should allow string with non-space characters', () => {
    var testFunction = isRealString('    a        a')
    expect(testFunction).toBe(true)
  })
})