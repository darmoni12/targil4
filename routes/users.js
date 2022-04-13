var express = require('express');
var router = express.Router();
var getType = require('../models/model');
const User = require('../models/User');

// const cors = require('cors')

// router.use(cors());

let dataPath = '../data.json'

router.get('/', function (req, res) {
  let file = require(dataPath)
  let users = file.users
  let type = getType(req.query.username)
  let temp=[]
  switch (type) {
    case ('admin'):
      for (var i in users)
      {
        if(users[i].active){
          temp.push(users[i])
        }
      }
      break;
    case ('employee'):
      for (var i in users)
      {
        if(users[i].type == 'client' && users[i].active)
        temp.push({username: users[i].username, type:users[i].type})
      }
      break;
    default:

      console.log("don't have authorization")
      res.sendStatus(403)
      return
  }

  console.log("send users to " + type)
  res.json({type: type, users: temp})
})

router.patch('/',function(req,res){
  console.log(req.body)
  if(getType(req.query.username) !== 'admin')
  {
      res.sendStatus(403)
      return
  }
  let file = require(dataPath)
  file.users.forEach((user)=>{
  console.log(req.body);
  if (user.username === req.body.username && user.active)
  {
    user.type = req.body.type
  }
})
  fs.writeFileSync(dataPath, JSON.stringify(file, null, '\t'));
})

router.delete('/',function(req, res) {
  console.log(req.body);
  var type = getType(req.query.username)
  if(type !== 'admin' && type !== 'employee')
  {
      res.sendStatus(403)
      return
  }
  let file = require(dataPath)
  file.users.forEach((user)=>{
  if (user.username == req.body.username && (type == 'admin' || req.body.type == 'client'))
  {
    user.active=false
  }
})
  fs.writeFileSync(dataPath, JSON.stringify(file, null, '\t'));
})

router.post('/', function (req, res) {
  console.log(req.body);
  let type = getType(req.query.username)
  if(!req.body.username)
  {
    res.sendStatus(403)
    return
  }
  if (type == 'admin' || (type == 'employee' && req.body.type == 'client')) {
    let file = require(dataPath)
    for (i in file.users){
      if (req.body.username == file.users[i].username) {
        
        res.sendStatus(403)
        return
      }
    }
    file.users.push({ username: req.body.username, pass: req.body.pass, type: req.body.type, active: true })
    fs.writeFileSync(dataPath, JSON.stringify(file, null, "\t"));
  }
})

module.exports = router;
