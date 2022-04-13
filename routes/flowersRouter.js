var express = require('express');
var router = express.Router();

var flowerControl = require("../controllers/flowersController");

router.get('/', flowerControl.getFlowers)

module.exports = router;
