var express = require('express')
var neighborhood = require('../../controls/neighborhoodscontroller')
var router = express.Router();
var states = require('../../db/states')


//Create a new neighborhood form
router.get('/new', function(req, res){
  res.render('neighborhood/create', {states: states, loggedin: req.cookies.userId})
})

//Post a new neighborhood
router.post('/', function(req, res){
  neighborhood.createNeighborhood(req.body, function(){
    res.redirect('/admin')
  }, function(location){
    res.render('index', {location: location, loggedin: req.cookies.userId})
  })
})

//Get form for neighborhood edit
router.get('/:id/edit', function(req, res){
  neighborhood.editNeighborhood(req.params.id, function(neighborhood){
    res.render('neighborhood/edit', {neighborhood: neighborhood, states: states, loggedin: req.cookies.userId})
  })
})

//Post route for neighborhood edit
router.post('/:id', function(req, res){
  neighborhood.updateNeighborhood(req.params.id, req.body, function(neighborhood){
    res.render('neighborhood/edit', {neighborhood: neighborhood, loggedin: req.cookies.userId})
  })
})



module.exports = router;
