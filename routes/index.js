var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/app')
var router = express.Router();


/* GET home page. */

//Read request all
router.get('/', function(req, res, next) {
  controller.read(req, res);
});

//Read request one
router.get('restaurant/:id', function(req, res, next){
  controller.readspec(req, res);
})

//Create new, form
router.get('/restaurant/new', function(req, res, next){
  res.render('restaurants/new');
})

//Post request Create
router.post('/restaurant/:id', function(req, res, next){
  if (req.body.input === 'Delete'){
    controller.createUpdateDelete(req, res, "delete")
  }else{
    controller.createUpdateDelete(req, res, "create");
  }
});

//Post request Update
router.post('/:id/edit', function(req, res){
  controller.createUpdateDelete(req, res, "update");
})


module.exports = router;


function restaurants(){
  return knex('mexican');
}
