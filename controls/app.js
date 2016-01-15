var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var states = require('../db/states')
var cuisine = require('../db/cuisine')

var commands = {

  read: function(req, res, loc, table){
    restaurants(table).select().table(table).then(function(result){
      res.render('restaurants/' + loc, {restaurants: result})
    })
  },
  readSpec: function(req, res, loc, table){
    restaurants(table).where('id', req.params.id).first().then(function(result){
      if (loc === 'new'){
        res.render('restaurants/' + loc, {restaurants: result, states: states, cuisine: cuisine})
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

  join: function(req, res){
    restaurants('locations').join('employees', 'locations.id', 'employees.restaurant_id').select().then(function(result){
      console.log(result);
    });
  }
}


module.exports = commands;

function restaurants(string){
  return knex(string);
}
