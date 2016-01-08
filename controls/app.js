var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var states = require('../db/states')
var cuisine = require('../db/cuisine')

var commands = {

  read: function(req, res){
    restaurants().select().table('mexican').then(function(result){
      res.render('restaurants/index', {restaurants: result})
    })
  },
  readSpec: function(req, res, loc){
    restaurants().where('id', req.params.id).first().then(function(result){
      if (loc === 'new'){
        res.render('restaurants/' + loc, {restaurants: result, states: states, cuisine: cuisine})
      }else{
        res.render('restaurants/' + loc, {restaurants: result})
      }
    })
  },

  create: function(res, object){
    restaurants().insert(object, 'id').then(function(result){
      res.redirect('/');
    })
  },

  update: function(req, res, object){
    restaurants().where('id', req.params.id).update(object).then(function(result){
      res.redirect('/restaurant/' + req.params.id)
    })
  },

  delete: function(req, res){
    restaurants().where('id', req.params.id).del().then(function(result){
      res.redirect('/')
    })
  }


}

module.exports = commands;

function restaurants(){
  return knex('mexican');
}
