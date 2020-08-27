var expect = require('expect')
var {generateMessage} = require('./message')
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