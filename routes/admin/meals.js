var express = require('express');
var meals = require('../../controls/mealscontroller.js')
var router = express.Router();


router.get('/:restaurantid/meals/new', function(req, res){
  res.render('meals/edit', {restaurantid : req.params.restaurantid, loggedin: req.cookies.userId})
})

router.get('/:restaurantid/meals/:mealid/edit', function(req, res){
  meals.readMeal(req.params.mealid, function(meal){
    res.render('meals/edit', {restaurantid: req.params.restaurantid, meal: meal, loggedin: req.cookies.userId })
  })
})

router.post('/:restaurantid/meals/:mealid', function(req, res){
  var obj = req.body;
  obj.restaurant_id = req.params.restaurantid
  obj.ingredients = JSON.stringify(obj.ingredients.split(","))
  meals.editMeal(req.params.mealid, obj, function(mealid){
    res.redirect('/admin/restaurants/' + req.params.restaurantid)
  })
})

router.post('/:restaurantid/meals', function(req, res){
  var obj = req.body;
  obj.restaurant_id = req.params.restaurantid
  obj.ingredients = JSON.stringify(obj.ingredients.split(","))
  meals.createMeal(obj, function(mealid){
    res.redirect('/admin/restaurants/' + req.params.restaurantid)
  })
})

router.post('/:restaurantid/meals/:mealid/delete', function(req, res){
  meals.deleteMeal(req.params.mealid, function(){
    res.redirect('/admin/restaurants/' + req.params.restaurantid);
  })
})



module.exports = router;
