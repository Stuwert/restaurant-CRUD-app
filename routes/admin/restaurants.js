var express = require('express');
var controller = require('../../controls/restaurantcontroller')
var neighborhoods = require('../../controls/neighborhoodscontroller')
var states = require('../../db/states')
var cuisine = require('../../db/cuisine')
var router = express.Router();



//Post request to make restaurant
router.post('/', function(req, res){
  controller.createRestaurant(function(id){
    res.redirect('/admin/restaurants/' + id);
  })
})

//Post request to update restaurant
router.post('/:id/edit', function(req, res){
  controller.editRestaurant(req.params.id, req.body, function(restaurant){
    res.render('admin/restaurantview', {restaurant: restaurant, loggedin: req.cookies.userId})
  })
})

//View Form to Create restaurant
router.get('/new', function(req, res){
  neighborhoods.readAllNeighborhoods(function(neighborhoods){
    res.render('admin/newrestaurant', {states: states, cuisine: cuisine, neighborhoods: neighborhoods, loggedin: req.cookies.userId})
  })
})

//View single restaurant and Employees
router.get('/:id', function(req, res){
  controller.renderSingleRestaurant(req.params.id, function(restaurant, meals){
    res.render('admin/restaurantview', {restaurant: restaurant, meals: meals, loggedin: req.cookies.userId})
  })
})

//View Form to Update restaurant
router.get('/:id/edit', function(req, res){
  controller.renderSingleRestaurant(req.params.id, function(restaurant){
    neighborhoods.readAllNeighborhoods(function(neighborhoods){
      res.render('admin/newrestaurant', {restaurant: restaurant, states: states, neighborhoods: neighborhoods, cuisine: cuisine, loggedin: req.cookies.userId})
    })
  })
})

//Post request to delete restaurant
router.get('/:id/delete', function(req, res){
  console.log("It hit");
  controller.deleteRestaurant(req.params.id, function(){
    res.redirect('/admin')
  })
})


module.exports = router;
//
