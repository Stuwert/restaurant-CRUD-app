var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/admincontroller')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();

//View all restaurants and employees
router.get('/', controller.readAll);

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

//View Form to Create employee
router.get('/restaurant/:id/employee/new', controller.createUpdateEmployee)

//View Form to Update employee
router.get('/restaurant/:id/employee/:eid/edit', controller.createUpdateEmployee)

//Delete employee post request
router.post('/restaurant/:id/employee/:eid/delete', controller.deleteEmployee);

//Post request to create Employees
router.post('/restaurant/:id/employee', controller.createEmployee);

//Post request to update Employees
router.post('/restaurant/:id/employee/:eid/edit', controller.updateEmployee)

module.exports = router;
