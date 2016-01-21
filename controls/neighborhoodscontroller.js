var knex = require('../db/knex')
var express = require('express');

module.exports = {

  readNeighborhood: function(req,res){
    Neighborhoods().where('id', req.params.id).first().then(function(result){
      console.log(result.epicenter.lat);
      res.render('restaurants/neighborhood', {title: result.name, epicenter: result.epicenter})
    })
  }

}

function Neighborhoods(){
  return knex('neighborhoods');
}
