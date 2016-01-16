var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/restaurantcontroller')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next){
  res.redirect('/restaurants')
})

//Read request all
router.get('/restaurants', controller.renderAllRestaurants);

//Read request single restaurant
router.get('/restaurant/:id/', controller.renderSingleRestaurant);

//Read Request Single Review


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
