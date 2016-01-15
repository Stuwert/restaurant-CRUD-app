var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/app')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();
var app = express();

var reviews = require('./reviews')
/* GET home page. */

//Read request all
router.get('/', function(req, res, next) {
  controller.read(req, res, "", "locations");
});

//Create new, form
router.get('/restaurant/new', function(req, res, next){
  res.render('restaurants/new', {states: states, cuisine: cuisine})
})

router.get('/restaurant/:id/reviews', function(req, res, next){
  app.use('/restaurant/' + req.params.id + '/reviews', reviews)
})

//Create new table item
router.post('/restaurant', function(req, res, next){
  controller.create(req, res, "locations");
})

//Edit form
router.get('/restaurant/:id/edit', function(req, res, next){
  controller.readSpec(req, res, 'new', 'locations')
})

//Get Admin Form
router.get('/restaurant/admin', function(req, res, next){
  controller.read(req, res, 'admin', 'employees')
})


//Read request single table element
router.get('/restaurant/:id', function(req, res, next){
  controller.readSpec(req, res, 'view', 'locations');
})

//Update thing.
router.post('/restaurant/:id', function(req, res, next){
  controller.update(req, res, 'locations')
})

//Delete item
router.post('/restaurant/:id/delete', function(req, res, next){
  controller.delete(req, res, "locations");
})


module.exports = router;


function restaurants(){
  return knex('locations');
}
