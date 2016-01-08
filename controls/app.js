var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var states = require('../db/states')
var cuisine = require('../db/cuisine')

var commands = {

  read: function(req, res){
    restaurants().select().then(function(result){
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
  }

  // createUpdateDelete: function(req, res, type, object, id, ){
  //   //id = req.params.id
  //   }else if(type =="update"){
  //     restaurant().where('id', id).update(object).then(function(result){
  //       res.redirect('index')
  //     })
  //   }else {
  //     restaurants().where('id', id).del().then(function(result){
  //       res.redirect('index');
  //     });
  //   }
  // }

}

module.exports = commands;

function restaurants(){
  return knex('mexican');
}
