var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/app')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();


/* GET home page. */

//Read request all
router.get('/', function(req, res, next) {
  controller.read(req, res);
});

//Create new, form
router.get('/restaurant/new', function(req, res, next){
  res.render('restaurants/new', {states: states, cuisine: cuisine});
})

router.post('/restaurant', function(req, res, next){
  var object = {
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
router.get('restaurant/:id', function(req, res, next){

  controller.readspec(req, res, object);
})


//Post request Create
// router.post('/restaurant', function(req, res, next){

//   controller.createUpdateDelete(req, res, "create", object);
// });
//
// router.post('/:id', function(req, res){
//   controller.createUpdateDelete(req, res, "delete")
//
// })
//
// //Post request Update
// router.post('/:id/edit', function(req, res){
//   controller.createUpdateDelete(req, res, "update");
// })


module.exports = router;


function restaurants(){
  return knex('mexican');
}
