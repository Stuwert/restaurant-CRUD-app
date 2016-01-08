var knex = require('../db/knex')
var express = require('express');
var router = express.Router();

var commands = {

  read: function(req, res){
    restaurants().select().then(function(result){
      res.render('restaurants/index', {restaurants: result})
    })
  },
  readSpec: function(req, res){
    restaurants().where('id', req.params.id).first().then(function(result){
      res.render('restaurants/view', {result: result})
    })
  },
  createUpdateDelete: function(req, res, type){
    var object = {
      name: req.body.name,
      location: {
        city: req.body.city,
        state: req.body.state
      },
      cuisine : req.body.cuisine,
      rating: req.body.rating,
      img: req.body.image,
      description: req.body.description
    }
    if (type === 'create'){
      restaurants().insert(object, 'id').then(function(result){
        res.redirect('index')
      })
    }else if(type =="update"){
      restaurant().where('id', req.params.id).update(object).then(function(result){
        res.redirect('index')
      })
    }else {
      restaurants().where('id', req.params.id).del().then(function(result){
        res.redirect('index');
      });
    }
  }

}

module.exports = commands;

function restaurants(){
  return knex('mexican');
}
