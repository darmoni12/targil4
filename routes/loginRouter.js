
var express = require('express');
var router = express.Router();

var loginControl = require("../controllers/loginController");

router.post('/', loginControl.login)

module.exports = router;
