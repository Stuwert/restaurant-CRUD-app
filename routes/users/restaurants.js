var express = require('express');
var controller = require('../../controls/restaurantcontroller')
var router = express.Router();

/* GET home page. */


//Read request all
router.get('/', controller.renderAllRestaurants);

// Post a new Review
router.post('/:id/reviews/', controller.createNewReview);

//Read request single restaurant
router.get('/:id/', controller.renderSingleRestaurant);

//Create a new Review
router.get('/:id/reviews/new', controller.createEditReview);

//Get form to edit a review
router.get('/:id/reviews/:reviewid/edit', controller.createEditReview)


//Delete a Review
router.post('/:id/reviews/:reviewid/delete', controller.deleteReview);

//Update a Review
router.post('/:id/reviews/:reviewid', controller.updateReview);

module.exports = router;
