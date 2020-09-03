const expect = require('expect')
const {Users} = require('./users')

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users()
    users.users = [
      {
        id: '1',
        name: 'Mamat',
        room: 'Solar'
      },
      {
        id: '2',
        name: 'Memet',
        room: 'Pertamax'
      },
      {
        id: '3',
        name: 'Momot',
        room: 'Solar'
      }
    ]
  })


  it('should add new user and match object', () => {
    var newUsers = new Users()
    var user = {
      id: '111',
      name: 'Mamat',
      room: 'Solar'
    }
    var resUser = newUsers.addUser(user.id, user.name, user.room)
    expect(newUsers.users).toEqual([user])
    expect(resUser).toMatchObject({
      id : user.id,
      name: user.name,
      room: user.room
    })
  })

  it('should return names for SOLAR room', () => {
    var userList = users.getUserList('Solar')
    expect(userList).toEqual(['Mamat', 'Momot'])
  })

  it('should return names for Pertamax room', () => {
    var userList = users.getUserList('Pertamax')
    expect(userList).toEqual(['Memet'])
  })

  it('should return user for selected id', () => {
    var user = users.getUser('1')
    expect(user).toEqual({
        id: '1',
        name: 'Mamat',
        room: 'Solar'
    })
  })

  it('should remove a user', () => {
    var user = users.removeUser('1')
    expect(user.id).toBe('1')
    expect(users.users.length).toBe(2)
  })

  it('should return false if id not found in removeUser', () => {
    var user = users.removeUser('99')
    expect(user).toEqual(false)
  })
})