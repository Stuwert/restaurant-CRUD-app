var knex = require('../db/knex')
var express = require('express');
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var positions = require('../db/positions')

var commands = {

  readAll: function(req, res){
    Restaurants().select().table('locations').then(function(result){
      Employees().select().table('employees').then(function(resultz){
        res.render('admin/index', {restaurants: result, employees: resultz})
      })
    })
  },

  readRestaurant: function(req, res){
    console.log(req.params);
    Restaurants().where('id', req.params.id).first().then(function(result){
      Employees().where('restaurant_id', req.params.id).then(function(resultz){
        res.render('admin/restaurantview', {restaurant: result, employees: resultz})
      })
    })
  },

  createUpdateRestaurant: function(req, res){
    Restaurants().where('id', req.params.id).first().then(function(result){
      res.render('admin/newrestaurant', {restaurant: result, states: states, cuisine: cuisine})
    })
  },
  createNewRestaurant: function(req, res){
    Restaurants().insert({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      description: req.body.description,
      img: req.body.img,
      rating: 0,
      location: null,
    }, 'id').then(function(result){
      console.log(result)
      res.redirect('/admin/')
    })
  },
  updateRestaurant: function(req, res){
    Restaurants().where('id', req.params.id).update({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      description: req.body.description,
      img: req.body.img,
      rating: 0,
      location: null,
    }).then(function(result){
      res.redirect('/admin')
    })
  },
  deleteRestaurant: function(req, res){
    Restaurants().where('id', req.params.id).delete().then(function(){
      res.redirect('/admin')
    })
  },
  createUpdateEmployee: function(req, res){
    Employees().where('id', req.params.eid).first().then(function(result){
      res.render('admin/editemployee', {positions: positions, employee: result, restaurant: {id: req.params.id}})
    })
  },
  createEmployee: function(req, res){
    Employees().insert({
      first_name: req.body.first,
      last_name: req.body.last,
      position: req.body.position,
      restaurant_id: req.params.id,
      performance: req.body.performance
    }, 'id').then(function(result){
      console.log(result)
      res.redirect('/admin/')
    })
  },
  updateEmployee: function(req, res){
    Employees().where('id', req.params.eid).update({
      first_name: req.body.first_name,
      last: req.body.first_name,
      position: req.body.position,
      performance: req.params.performance
    }).then(function(result){
      res.redirect('/admin')
    })
  },

  deleteEmployee: function(req, res){
    Employees().where('id', req.params.eid).delete().then(function(){
      res.redirect('/admin/restaurant/' + req.params.id)
    })
  }

}


module.exports = commands;

function Employees(){
  return knex('employees');
}

function Restaurants(){
  return knex('locations');
}
