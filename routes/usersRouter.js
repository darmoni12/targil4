var express = require('express');
var router = express.Router();

var userControl = require("../controllers/usersController");


router.get('/', userControl.getUsers)

router.patch('/', userControl.updateUser)

router.delete('/', userControl.deleteUser)

router.post('/', userControl.addUser)

module.exports = router;
