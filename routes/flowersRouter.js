var express = require('express');
var router = express.Router();

var flowerControl = require("../controllers/flowersController");

app.get('/', function (req, res) {
    console.log(req.query.username);
    console.log(getType(req.query.username));
    // if the user is still exist "active..."
    if (getType(req.query.username))
    {
      let file = require(dataPath)
      console.log("send flowers")
      res.json(file.flowers)
    }
});


module.exports = router;
