var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/app')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

router.get('/', function(req, res, next){
  controller.read(req, res, "adminall", "locations");
})

router.get('/restaurant/new', function(req, res, next){
  res.render('restaurants/new', {action: '/admin/restaurants', states: states, cuisine: cuisine})
})

router.get('/restaurant/:id', function(req, res, next){
  controller.readFilter(req, res, 'admin', 'employees', 'restaurant_id')
})

router.get('/restaurant/:restaurantid/employee/:id', function(req, res, next){
  controller.readSpec(req, res, 'employee', 'employees')
})

router.post('/restaurant/:restaurantid/employee/', function(req, res, next){
  controller.readSpec(req, res, 'employee', 'employees')
})

router.get('/restaurant/:restaurantid/employee/:id/edit', function(req, res, next){
  controller.readSpec(req, res, 'editemployee', 'employees')
})

router.post('/restaurant/:restaurantid/employee/:id/edit', function(req, res, next){
  controller.updateEmployee(req, res, 'editemployee', 'employees')
})

router.post('/restaurant/:restaurantid/employee/:id/delete', function(req, res, next){
  controller.delete(req, res, 'employees')
})



module.exports = router;
