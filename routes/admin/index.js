var express = require('express');
var neighborhoods = require('../../controls/neighborhoodscontroller.js')
var restaurants = require('../../controls/restaurantcontroller.js')
var router = express.Router();


router.get('/', function(req, res){
  neighborhoods.readAllNeighborhoods(function(neighborhoods){
    restaurants.renderAllRestaurants(function(restaurants){
      res.render('admin/index', {neighborhoods: neighborhoods, restaurants: restaurants})
    })
  })
})




module.exports = router;
