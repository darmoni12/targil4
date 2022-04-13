

const Flower = require('../models/FlowerSchema');

var utilsFunc = require('./utils');
// let dataPath = '../data.json'

async function getFlowers(req, res) {
    console.log(req.query.username);
    // if the user is still exist "active..."
    if (await utilsFunc.getType(req.query.username))
    {
      // let file = require(dataPath)
      all = await Flower.find({active:true});
      
      console.log("send flowers")
      res.json(all)
    }
}

module.exports = { getFlowers, }
