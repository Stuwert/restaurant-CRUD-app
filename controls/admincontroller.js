var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
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
    Restaurants().where('id', req.params.id).first().then(function(result){
      Employees().where('restaurant_id', req.params.id).then(function(resultz){
        res.render('admin/restaurantview', {restaurant: result, employees: resultz})
      })
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
