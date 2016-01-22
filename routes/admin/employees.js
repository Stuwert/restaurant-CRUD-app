var express = require('express')
var controller = require('../../controls/admincontroller')
var router = express.Router();


//View Form to Create employee
router.get('/:id/employees/new', controller.createUpdateEmployee)

//View Form to Update employee
router.get('/:id/employees/:eid/edit', controller.createUpdateEmployee)

//Delete employee post request
router.post('/:id/employees/:eid/delete', controller.deleteEmployee);

//Post request to create Employees
router.post('/:id/employees', controller.createEmployee);

//Post request to update Employees
router.post('/:id/employees/:eid/edit', controller.updateEmployee)

module.exports = router;
