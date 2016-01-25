var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var positions = require('../db/positions')

var commands = {

  renderAllRestaurants: function(req, res){
    Restaurants().select().table('locations').then(function(result){
      Reviews().select().table('reviews').then(function(rezult){
        res.render('restaurants/index', {restaurants: result, reviews: rezult});
      })
    })
  },

  renderSingleRestaurant: function(req, res){
    Restaurants().where('id', req.params.id).first().then(function(result){
      Reviews().where('restaurant_id', req.params.id).then(function(resultz){
        res.render('restaurants/view', {restaurant: result, reviews: resultz, avgrating: averageRating(resultz)});
      })
    })
  },

  createEditReview: function(req, res){
    var reviewid = req.params.reviewid > 0 ? req.params.reviewid : -1;
    Reviews().where('id', reviewid).first().then(function(result){
      Restaurants().where('id', req.params.id).first().then(function(resultz){
        res.render('restaurants/review', {review: result, restaurant: resultz})
      })
    })
  },

  createNewReview: function(req, res){
    if (isBlank(req.body)){
      res.render('restaurants/review', {review: req.body, restaurant: req.params})
    }else{
      Reviews().insert({
        reviewer_name: req.body.reviewer_name,
        rating: req.body.rating,
        review: req.body.review,
        restaurant_id: req.params.id,
        created_at: new Date()
      }, 'id').then(function(){
        res.redirect('/restaurants/' + req.params.id)
      })
    }
  },

  deleteReview: function(req, res){
    Reviews().where('id', req.params.reviewid).del().then(function(result){
      res.redirect('/restaurant/' + req.params.id);
    })
  },

  updateReview: function(req, res){
    if (isBlank(req.body)){
      res.render('restaurants/review', {review: {
        reviewer_name: req.body.reviewer_name,
        rating: req.body.rating,
        review: req.body.review,
        id: req.params.reviewid
      }, restaurant: req.params})
    }else{
      Reviews().where('id', req.params.reviewid).update({
        reviewer_name: req.body.reviewer_name,
        rating: req.body.rating,
        review: req.body.review,
        updated_at: new Date()
      }).then(function(result){
        res.redirect('/restaurants/' + req.params.id)
      })
    }
  },
}


module.exports = commands;

function Restaurants(){
  return knex('locations');
}

function Reviews(){
  return knex('reviews');
}

function averageRating(array){
  var total = 0, count;
  array.forEach(function(item, i){
    count = i;
    total += item.rating;
  })
  return total / (count + 1);
}

function isBlank(object){
  for(var item in object){
    if (object[item] === ""){
      return true;
    }
  }
  return false;
}
