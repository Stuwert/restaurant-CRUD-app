var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/app')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

router.get('/', function(req, res, next){
  controller.read(req, res, "adminall", "locations");
})

router.get('/:id')


module.exports = router;
