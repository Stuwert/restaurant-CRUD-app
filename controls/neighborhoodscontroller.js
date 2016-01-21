var knex = require('../db/knex')
var express = require('express');
var states = require('../db/states')
var request = require('request')
var querystring = require('querystring')

/* GET home page. */

module.exports = {

  readNeighborhood: function(req,res){
    Neighborhoods().where('id', req.params.id).first().then(function(result){
      console.log(result.epicenter.lat);
      res.render('restaurants/neighborhood', {title: result.name, epicenter: result.epicenter})
    })
  },
  createNeighborhood: function(req, res){
    var google = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    var location = req.body.address + ',' + req.body.city + ',' + req.body.state;
    request(google + location + '&key=' + process.env.GOOGLE_API, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var jase = JSON.parse(body);
      var newResp = jase.results[0].address_components
      Neighborhoods().insert({
        name: req.body.name,
        epicenter: jase.results[0].geometry.location,
        county: newResp[3].long_name,
        city: newResp[2].long_name,
        state: newResp[4].short_name,
      }).then(function(){
        res.redirect('/admin')
      })
      res.render('index', {location: jase.results[0].geometry.location})
     }
   })
  },
  createEditNeighborhood: function(req, res){
    res.render('admin/createneighborhood', {states: states})
  }

}

function Neighborhoods(){
  return knex('neighborhoods');
}