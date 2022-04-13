// const { default: mongoose } = require('mongoose');
const debug = require('debug')('mongo:mongo');
const mongo = require('mongoose');
// const UserSchema = require('../models/UserSchema');
const User = require('../models/UserSchema');
let dataPath = '../data.json'

function getType(username)
{
  let file = require(dataPath)
  // let type
  let users = file.users
  for (var i in users) {
    if (users[i].active && users[i].username == username) {
      return users[i].type
    }
  }
  return null
}

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict 

  try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      //create and store the new user
      const result = await User.create({
          "username": user,
          "password": hashedPwd
      });

      console.log(result);

      res.status(201).json({ 'success': `New user ${user} created!` });
  } catch (err) {
      res.status(500).json({ 'message': err.message });
  }
}

function getUsers(req, res){

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
}

function updateUser(req,res){
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
}

function deleteUser(req, res) {
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
}



async function addUser(req, res) {
  console.log("\t\t\t" , req.body);
  try{
    const response = await new User(req.body).save();
  }
  catch{
    
  }
  // if(!req.body.username)
  // {
  //   res.sendStatus(403)
  //   return
  // }
  // let type = getType(req.query.username)

  // if (type == 'admin' || (type == 'employee' && req.body.type == 'client')) {
    // let file = require(dataPath)
    // for (i in file.users){
    //   if (req.body.username == file.users[i].username) {
        
    //     res.sendStatus(403)
    //     return
    //   }
    // }
    
    // check for duplicate usernames in the db
    // const duplicate = await User.findOne({ username: req.body.username }).exec();
    // if (duplicate) return res.sendStatus(409); //Conflict 

    
    // try {
      // //encrypt the password
      // const hashedPwd = await bcrypt.hash(pwd, 10);

      // //create and store the new user
      // const result = User.create(req.body);

      // process.env.mongoose

      /*
      // console.log(result , "hereeeeeeeeeeee");
      const result = await User.db("user_schema").collection("UserSchema").insertOne(req.body);
      console.log(result , "hereeeeeeeeeeee");
      */
    //  console.log("\n\n\n \t hereeeeeeeeee111 \n\n")

    /*
    var mongoDB = "mongodb://localhost/user_schema";
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

    var db = mongoose.connection;

    db.collection("UserSchema").insertOne(req.body);

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    */

    
  
  //   let db = mongo.createConnection('mongodb://localhost:27017/user_schema' /*, { useMongoClient: true }*/);
  //   db.then(async db1 => {
  //     debug('Creating model');
  //     let Test = db.model("Test", new mongo.Schema(User), "Empties");
  //     debug('Creating a document');
  //     await Test.create({});
  //     debug('Query');
  //     let tests = await Test.find({}).exec();
  //     debug(tests);
  //     debug(await Test.findOne({}).exec());
  //     let close = db1.close();
  //     debug('Closing');
  //     await close;
  //     debug('Closed');
  // });


//   async function (user) {
//     try {
//         const response = await new User(user).save();
//         console.log(`${response.username} was added`);
//         // return db_msgs.insert_success;
//     }
//     catch (err) {
//         console.log(err);
//         return db_msgs.unknown_error;
//     }
// }

  
    

  //     res.status(201).json({ 'success': `New user ${req.body.username} created!` });
  // } catch (err) {
  //   console.log('err.message: ', err.message)
  //     res.status(500).json({ 'message': err.message });
  // }
    // file.users.push({ username: req.body.username, pass: req.body.pass, type: req.body.type, active: true })
    // fs.writeFileSync(dataPath, JSON.stringify(file, null, "\t"));
  // }
}

module.exports = { getUsers, updateUser, deleteUser, addUser, }
