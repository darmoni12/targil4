
let dataPath = '../data.json'

function getType(username)
{
  let file = require(dataPath)
  let type
  let users = file.users
  for (var i in users) {
    if (users[i].active && users[i].username == username) {
      return users[i].type
    }
  }
  return null
}

module.exports = getType;
