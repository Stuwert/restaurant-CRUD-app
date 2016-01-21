var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/admincontroller')
var neighborhood = require('../controls/neighborhoodscontroller')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

//View all restaurants and employees
router.get('/', controller.readAll);

//Create a new neighborhood form
router.get('/neighborhoods/new', neighborhood.createEditNeighborhood);

//Post a new neighborhood
router.post('/neighborhoods', neighborhood.createNeighborhood);

//Post request to make restaurant
router.post('/restaurant', controller.createNewRestaurant);

//Post request to update restaurant
router.post('/restaurant/:id/edit', controller.updateRestaurant);

//View Form to Create restaurant
router.get('/restaurant/new', controller.createUpdateRestaurant);

//View single restaurant and Employees
router.get('/restaurant/:id', controller.readRestaurant);

//View Form to Update restaurant
router.get('/restaurant/:id/edit', controller.createUpdateRestaurant);

//Post request to delete restaurant
router.post('/restaurant/:id/delete', controller.deleteRestaurant);



module.exports = router;
