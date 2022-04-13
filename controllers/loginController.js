
const User = require('../models/UserSchema');

async function login(req, response) {
    console.log(req.body);
    // let file = require(dataPath)
  
    var filter={username:req.body.username,pass:req.body.pass}
  // let resUser = file.users.find(user => user.username == req.body.username && user.pass == req.body.pass)
  const resUser = await User.findOne(filter).exec();

  
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
