var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/app')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

/* GET home page. */

//Read request all
router.get('/', function(req, res, next) {
  controller.read(req, res, "", "locations");
});

//Create new, form
router.get('/restaurant/new', function(req, res, next){
  res.render('restaurants/new', {states: states, cuisine: cuisine, action: '/restaurants'})
})

//Create new table item
router.post('/restaurant', function(req, res, next){
  controller.create(req, res, "locations");
})

//Read request single table element
router.get('/restaurant/:id/', function(req, res, next){
  controller.readSpec(req, res, 'view', 'locations', 'id');
})



//Edit form
router.get('/restaurant/:id/edit', function(req, res, next){
  controller.readSpec(req, res, 'new', 'locations', 'id')
})


//Update thing.
router.post('/restaurant/:id', function(req, res, next){
  controller.update(req, res, 'locations')
})

//Delete item
router.post('/restaurant/:id/delete', function(req, res, next){
  controller.delete(req, res, "locations");
})


// **********  Reviews
// **********  Reviews

//All reviews for a restaurant
router.get('/restaurant/:id/review', function(req, res, next){
  controller.read(req, res, "allreviews", 'reviews')
})

//Create new restaurant review
router.post('/restaurant/:id/review', function(req, res, next){
  controller.create(req, res, 'reviews');
})

//Form to create a new restaurant review
router.get('/restaurant/:id/review/new', function(req, res, next){
  res.render('restaurants/editreview');
})

//Read Single review for a restaurant
router.get('/restaurant/:restaurantid/review/:id', function(req, res, next){
  controller.read(req, res, 'review', 'reviews');
})

//Form to Update Restaurant review
router.get('/restaurant/:restaurantid/review/:id/edit', function(req, res, next){
  controller.readSpec(req, res, 'editreview', 'reviews')
})

//Update restaurant review
router.post('/restaurant/:restaurantid/review/:id', function(req, res, next){
  controller.updateReview(req, res);
})

//Delete restaurant review
router.post('/restaurant/:restaurantid/review/:id/delete', function(req, res, next){
  controller.delete(req, res, 'reviews')
})


module.exports = router;


function restaurants(){
  return knex('locations');
}
