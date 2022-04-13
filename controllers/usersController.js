const User = require('../models/UserSchema');

async function getType(username) {
  const user = await User.findOne({ username: username }).exec();
  if(user && user.active) return user.type
  return null
}

async function getUsers(req, res) {

  let type = await getType(req.query.username)
  var all

  switch (type) {
    case ('admin'):
      all = await User.find({active:true });
      break;
    case ('employee'):

      all = await User.find({active:true ,type:'client'});
      all = all.map(x=>({username: x.username, type: x.type}))
      break;
    default:

      console.log("don't have authorization")
      res.sendStatus(403)
      return
  }

  console.log("send users to " + type)
  res.json({type:type,users: all})
}

async function updateUser(req, res) {
  console.log(req.body)
  var type = await getType(req.query.username)
  if (type !== 'admin') {
    res.sendStatus(403)
    return
  }
  var filter = {username:req.body.username , active:true}
  var update = {type:req.body.type}
  
  await User.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true // Make this update into an upsert
  });
}

async function deleteUser(req, res) {
  console.log(req.body);
  var type = getType(req.query.username)
  const filter = { username: req.body.username };
  const update = { active: false };
  const todelete = await User.findOne({ username: req.body.username }).exec();

  if (type == 'admin' || (type == 'employee' && todelete.type == 'client')) {

    // Document changed in MongoDB, but not in Mongoose
    await User.updateOne(filter, update);
  }
}


async function addUser(req, res) {
  console.log(req.body);

  let type = getType(req.query.username)

  if (type == 'admin' || (type == 'employee' && req.body.type == 'client')) {

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: req.body.username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 


    try {
      const response = await new User(req.body).save();

      res.status(201).json({ 'success': `New user ${req.body.username} created!` });
    }
    catch (err) {
      console.log('err.message: ', err.message)
      res.status(500).json({ 'message': err.message });
    }
  }
}

module.exports = { getUsers, updateUser, deleteUser, addUser, }
