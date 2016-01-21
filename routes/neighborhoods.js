var express = require('express')
var neighborhood = require('../controls/neighborhoodscontroller')
var router = express.Router();

router.get('/', neighborhood.readAllNeighborhoods);

//Read a neighborhood
router.get('/:id', neighborhood.readNeighborhood);

//Read a restaurant



module.exports = router;
