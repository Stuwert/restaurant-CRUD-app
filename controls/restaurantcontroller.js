var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var positions = require('../db/positions')

var commands = {

  renderAllRestaurants: function(req, res){
    Restaurants().select().table('locations').then(function(result){
      res.render('restaurants/index', {restaurants: result});
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
    console.log(req.body);
    Reviews().insert({
      reviewer_name: req.body.reviewer_name,
      date: new Date(),
      rating: req.body.rating,
      review: req.body.review,
      restaurant_id: req.params.id
    }, 'id').then(function(){
      res.redirect('/restaurant/' + req.params.id)
    })
  },

  deleteReview: function(req, res){
    Reviews().where('id', req.params.reviewid).del().then(function(result){
      res.redirect('/restaurant/' + req.params.id);
    })
  },

  updateReview: function(req, res){
    Reviews().where('id', req.params.reviewid).update({
      reviewer_name: req.body.reviewer_name,
      date: new Date(),
      rating: req.body.rating,
      review: req.body.review,
    }).then(function(result){
      res.redirect('/restaurant/' + req.params.id)
    })
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
