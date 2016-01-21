var express = require('express');
var knex = require('../db/knex');
var controller = require('../controls/admincontroller')
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var router = express.Router();


//View Form to Create employee
router.get('/:id/employee/new', controller.createUpdateEmployee)

//View Form to Update employee
router.get('/:id/employee/:eid/edit', controller.createUpdateEmployee)

//Delete employee post request
router.post('/:id/employee/:eid/delete', controller.deleteEmployee);

//Post request to create Employees
router.post('/:id/employee', controller.createEmployee);

//Post request to update Employees
router.post('/:id/employee/:eid/edit', controller.updateEmployee)

module.exports = router;
