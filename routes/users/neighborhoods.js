var express = require('express')
var neighborhood = require('../../controls/neighborhoodscontroller')
var restaurants = require('../../controls/restaurantcontroller')
var router = express.Router();

router.get('/', function(req, res){
  neighborhood.readAllNeighborhoods(function(neighborhoods){
    res.render('neighborhood/index', {neighborhoods: neighborhoods})
  })
});

// //Read a neighborhood
router.get('/:id', function(req, res){
  neighborhood.readNeighborhood(req.params.id, function(neighborhood){
    restaurants.getRestaurantsInNeighborhood(req.params.id, function(restaurants){
      res.render('neighborhood/view', {neighborhood: neighborhood, restaurants: restaurants})
    })
  })
});

//Read a restaurant



module.exports = router;
