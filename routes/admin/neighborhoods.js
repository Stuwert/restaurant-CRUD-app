var express = require('express')
var neighborhood = require('../../controls/neighborhoodscontroller')
var router = express.Router();

//Create a new neighborhood form
router.get('/new', neighborhood.createEditNeighborhood);

//Post a new neighborhood
router.post('/', neighborhood.createNeighborhood);




module.exports = router;
