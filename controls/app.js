var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var positions = require('../db/positions')

var commands = {

  read: function(req, res, loc, table){
    restaurants(table).select().table(table).then(function(result){
      if (table === 'locations'){
        restaurants('reviews').select().table('reviews').then(function(resultz){
          res.render('restaurants/' + loc, {restaurants: result, reviews: resultz})
        })
      }else{
        res.render('restaurants/' + loc, {restaurants: result})
      }
    })
  },
  readSpec: function(req, res, loc, table){
    restaurants(table).where('id', req.params.id).first().then(function(result){
      if (loc === 'new'){
        res.render('restaurants/' + loc, {restaurants: result, states: states, cuisine: cuisine, action: '/restaurant/' + req.params.id + '/'})
      }else if (loc === 'editemployee'){
        res.render('restaurants/' + loc, {employee: result, positions: positions, action: '/admin/restaurant/' + req.params.restaurantid + '/employee/' + req.params.id })
      }else{
        res.render('restaurants/' + loc, {restaurants: result})
      }
    })
  },

  create: function(req, res, table){
    var object = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      cuisine : req.body.cuisine,
      rating: req.body.rating,
      img: req.body.img,
      description: req.body.description,
    }
    restaurants(table).insert(object, 'id').then(function(result){
      res.redirect('/');
    })
  },

  update: function(req, res, table){
    var object = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      cuisine : req.body.cuisine,
      rating: req.body.rating,
      img: req.body.img,
      description: req.body.description,
    }
    restaurants(table).where('id', req.params.id).update(object).then(function(result){
      res.redirect('/restaurant/' + req.params.id)
    })
  },

  delete: function(req, res, table){
    restaurants(table).where('id', req.params.id).del().then(function(result){
      res.redirect('/')
    })
  },

  join: function(req, res, db){
    restaurants('location').join(db, 'location.id', '=', db + '.restaurant_id').where('id', req.params.id).first().then(function(result){

    });
  },

  readFilter: function(req, res, loc, table, filter){
    restaurants(table).where(filter, req.params.id).then(function(result){
      res.render('restaurants/' + loc, {restaurants: result})
    })
  },
  updateEmployee: function(req, res){
    var object = {
      first_name: req.body.first,
      last_name: req.body.last,
      position: req.body.position
    }
    restaurants('employees').where('id', req.params.id).update(object).then(function(result){
      res.redirect('/admin/restaurant/' + req.params.restaurantid + '/employee/' + req.params.id)
    })
  },
  updateReview: function(req, res){
    var object = {
      reviewer_name: req.body.reviewer,
      date: req.body.date,
      rating: req.body.rating,
      review: req.body.review
    }
    restaurants('reviews').where('id', req.params.id).update(object).then(function(result){
      res.redirect('/restaurant/' + req.params.restaurantid + '/review/' + req.params.id)
    })
  }


}


module.exports = commands;

function restaurants(string){
  return knex(string);
}
