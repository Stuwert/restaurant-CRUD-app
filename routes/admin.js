var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/admincontroller')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

//View all restaurants and employees
router.get('/', controller.readAll);

//View single restaurant and Employees
router.get('/restaurant/:id', controller.readRestaurant)


module.exports = router;
