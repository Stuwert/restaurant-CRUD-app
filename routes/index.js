var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/app')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();
var object = {
  name: null,
  location: {
    city: null,
    state: null
  },
  cuisine : null,
  rating: null,
  img: null,
  description: null,
}

/* GET home page. */

//Read request all
router.get('/', function(req, res, next) {
  controller.read(req, res);
});

//Create new, form
router.get('/restaurant/new', function(req, res, next){
  res.render('restaurants/new', {restaurants: object, states: states, cuisine: cuisine})
})

//Edit form
router.get('/restaurant/:id/edit', function(req, res, next){
  controller.readSpec(req, res, 'new')
})

router.post('/restaurant', function(req, res, next){
  object = {
    name: req.body.name,
    location: {
      city: req.body.city,
      state: req.body.state
    },
    cuisine : req.body.cuisine,
    rating: req.body.rating,
    img: req.body.img,
    description: req.body.description,
  }
  controller.create(res, object)
})

//Read request one
router.get('/restaurant/:id', function(req, res, next){
  controller.readSpec(req, res, 'view');
})

router.post('/restaurant/:id', function(req, res, next){
  if (req.body.button === 'delete'){
    controller.delete(req, res);
  }else{
    object = {
      name: req.body.name,
      location: {
        city: req.body.city,
        state: req.body.state
      },
      cuisine : req.body.cuisine,
      rating: req.body.rating,
      img: req.body.img,
      description: req.body.description,
    }
    controller.update(req, res, object)
  }
})


module.exports = router;


function restaurants(){
  return knex('mexican');
}
