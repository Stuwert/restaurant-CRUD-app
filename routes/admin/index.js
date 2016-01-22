var express = require('express');
var controller = require('../../controls/admincontroller')
var router = express.Router();

//View all restaurants and employees
router.get('/', controller.readAll);




module.exports = router;
