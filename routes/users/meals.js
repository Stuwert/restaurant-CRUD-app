var express = require('express');
var controller = require('../../controls/mealscontroller')
var router = express.Router();

router.get('/:restaurant_id/meals/:mealid', function(req, res){
  controller.readMeal(req.params.mealid, function(meal, reviews){
    res.render('meals/view', {meal: meal, reviews: reviews, restaurantid: req.params.restaurant_id})
  })
})


module.exports = router;
