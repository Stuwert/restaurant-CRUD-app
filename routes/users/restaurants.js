var express = require('express');
var controller = require('../../controls/restaurantcontroller')
var router = express.Router();
var holderobj;

/* GET home page. */


//Read request all
router.get('/', controller.renderAllRestaurants);

// Post a new Review
router.post('/restaurant/:id/review/', function(req, res){
  if(req.body.reviewer_name !== '' && req.body.rating !== undefined && req.body.review !== ''){
    controller.createNewReview(req, res);
    holderobj = undefined;
  }else{
    holderobj = req.body;
    res.redirect('/restaurant/' + req.params.id + '/review/new')
  }
});

//Read request single restaurant
router.get('/:id/', controller.renderSingleRestaurant);

//Create a new Review
router.get('/:id/review/new', function(req, res){
  if (holderobj !== undefined){
    res.render('restaurants/review', {restaurant: req.params, review: holderobj});
  }else{
    controller.createEditReview(req, res);
  }
  holderobj = undefined;
});

//Get form to edit a review
router.get('/:id/review/:reviewid/edit', function(req, res){
  if(holderobj !== undefined){
    res.render('restaurants/review', {restaurant: req.params, review: holderobj});
  }else{
    controller.createEditReview(req, res);
  }
})


//Delete a Review
router.post('/:id/review/:reviewid/delete', controller.deleteReview);

//Update a Review
router.post('/:id/review/:reviewid', function(req, res){
  if(req.body.reviewer_name !== '' && req.body.rating !== undefined && req.body.review !== ''){
    controller.updateReview(req, res);
    holderobj = undefined;
  }else{
    holderobj = req.body;
    holderobj.id = req.params.reviewid;
    res.redirect('/restaurant/' + req.params.id + '/review/' + req.params.reviewid + '/edit')
  }
});

module.exports = router;


function restaurants(){
  return knex('locations');
}