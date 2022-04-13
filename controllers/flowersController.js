
var utilsFunc = require('./utils');
let dataPath = '../data.json'

function getFlowers(req, res) {
    console.log(req.query.username);
    console.log(utilsFunc.getType(req.query.username));
    // if the user is still exist "active..."
    if (utilsFunc.getType(req.query.username))
    {
      let file = require(dataPath)
      console.log("send flowers")
      res.json(file.flowers)
    }
}

module.exports = { getFlowers, }
