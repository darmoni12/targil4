
const fs = require('fs');

let dataPath = '../data.json'

function login(req, response) {
    console.log(req.body);
    let file = require(dataPath)
  
  let resUser = file.users.find(user => user.username == req.body.username && user.pass == req.body.pass)
  
  if(resUser)
  {
      console.log('logedin')
        console.log('send ok')
        response.sendStatus(200)
        return;
  }
      response.sendStatus(301)
      console.log('send not ok')
}

module.exports = { login, }
