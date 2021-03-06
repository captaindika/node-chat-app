
//add user(id, name, room)
//removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
   this.users = []
  }
  addUser(id, name, room) {
    var user = {id, name, room}
    this.users.push(user)
    return user
  }

  removeUser(id) {
    var user = this.getUser(id)
    if (user) {
      this.users = this.users.filter( (person) => person.id !== id)
      return user
    } else {
      return false
    }
  }

  getUser(id) {
    var users = this.users.filter( (user) => user.id === id)
    return users[0]
  }
  getUserList (room) {
    var users = this.users.filter( (user) => user.room === room)
    var namesArray = users.map ((user) => user.name)
    return namesArray
  }
}

module.exports= {
  Users
}