var express = require('express');
var controller = require('../../controls/restaurantcontroller')
var router = express.Router();

/* GET home page. */


//Read request all
router.get('/', function(req, res){
  controller.renderAllRestaurants(function(restaurants){
    res.render('restaurants/index', {restaurants: restaurants})
  })
})

//Read request single restaurant
router.get('/:id/', function(req, res){
  controller.renderSingleRestaurant(req.params.id, function(restaurant, meals){
    res.render('restaurants/view', {restaurant: restaurant, meals: meals})
  })
})

module.exports = router;
