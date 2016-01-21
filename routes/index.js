var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/restaurantcontroller')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var neighborhood = require('../controls/neighborhoodscontroller')
var router = express.Router();
var holderobj;

/* GET home page. */

//Auto redirects index to restaurants
router.get('/', function(req, res, next){
  res.redirect('/restaurants')
})

router.get('/neighborhoods', neighborhood.readAllNeighborhoods);

//Read a neighborhood
router.get('/neighborhoods/:id', neighborhood.readNeighborhood);

//Read request all
router.get('/restaurants', controller.renderAllRestaurants);

// Post a new Review
router.post('/restaurant/:id/review/', function(req, res){
  if(req.body.reviewer_name !== '' && req.body.rating !== undefined && req.body.review !== ''){
    controller.createNewReview(req, res);
    holderobj = undefined;
  }else{
    holderobj = req.body;
    res.redirect('/restaurant/' + req.params.id + '/review/new')
  }
});

//Read request single restaurant
router.get('/restaurant/:id/', controller.renderSingleRestaurant);

//Create a new Review
router.get('/restaurant/:id/review/new', function(req, res){
  if (holderobj !== undefined){
    res.render('restaurants/review', {restaurant: req.params, review: holderobj});
  }else{
    controller.createEditReview(req, res);
  }
  holderobj = undefined;
});

//Get form to edit a review
router.get('/restaurant/:id/review/:reviewid/edit', function(req, res){
  if(holderobj !== undefined){
    res.render('restaurants/review', {restaurant: req.params, review: holderobj});
  }else{
    controller.createEditReview(req, res);
  }
})


//Delete a Review
router.post('/restaurant/:id/review/:reviewid/delete', controller.deleteReview);

//Update a Review
router.post('/restaurant/:id/review/:reviewid', function(req, res){
  if(req.body.reviewer_name !== '' && req.body.rating !== undefined && req.body.review !== ''){
    controller.updateReview(req, res);
    holderobj = undefined;
  }else{
    holderobj = req.body;
    holderobj.id = req.params.reviewid;
    res.redirect('/restaurant/' + req.params.id + '/review/' + req.params.reviewid + '/edit')
  }
});

module.exports = router;


function restaurants(){
  return knex('locations');
}
