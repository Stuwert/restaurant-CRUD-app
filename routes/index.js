var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/restaurantcontroller')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

/* GET home page. */

//Auto redirects index to restaurants
router.get('/', function(req, res, next){
  res.redirect('/restaurants')
})

//Read request all
router.get('/restaurants', controller.renderAllRestaurants);

// Post a new Review
router.post('/restaurant/:id/review/', controller.createNewReview);

//Read request single restaurant
router.get('/restaurant/:id/', controller.renderSingleRestaurant);

//Create a new Review
router.get('/restaurant/:id/review/:reviewid', controller.createEditReview);

//Delete a Review
router.post('/restaurant/:id/review/:reviewid/delete', controller.deleteReview);

//Update a Review
router.post('/restaurant/:id/review/:reviewid', controller.updateReview);

module.exports = router;


function restaurants(){
  return knex('locations');
}
