var express = require('express')
var neighborhood = require('../../controls/neighborhoodscontroller')
var router = express.Router();

//Create a new neighborhood form
router.get('/new', neighborhood.createNeighborhood);

//Post a new neighborhood
router.post('/', neighborhood.createNeighborhood);

//Get form for neighborhood edit
router.get('/:id/edit', neighborhood.editNeighborhood);

//Post route for neighborhood edit
router.post('/:id', neighborhood.updateNeighborhood);




module.exports = router;
