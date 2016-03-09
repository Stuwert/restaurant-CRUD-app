// var knex = require('../db/knex')
// var express = require('express');
// var states = require('../db/states')
// var cuisine = require('../db/cuisine')
// var positions = require('../db/positions')
// var request = require('request')
//
// var commands = {
//
//   readAll: function(req, res){
//     Restaurants().select().table('locations').then(function(result){
//       Employees().select().table('employees').then(function(resultz){
//         Neighborhoods().select().then(function(ney){
//           res.render('admin/index', {restaurants: result, employees: resultz, neighborhoods: ney})
//         })
//       })
//     })
//   },
//
//   readRestaurant: function(req, res){
//     Restaurants().where('id', req.params.id).first().then(function(result){
//       Employees().where('restaurant_id', req.params.id).then(function(resultz){
//         res.render('admin/restaurantview', {restaurant: result, employees: resultz})
//       })
//     })
//   },
//
//   createUpdateRestaurant: function(req, res){
//     Restaurants().where('id', req.params.id).first().then(function(result){
//       Neighborhoods().select().then(function(neighborhoods){
//         res.render('admin/newrestaurant', {restaurant: result, states: states, cuisine: cuisine, neighborhoods: neighborhoods})
//       })
//     })
//   },
//
//   createNewRestaurant: function(req, res){
//     if (isBlank(req.body)){
//       Neighborhoods().select().then(function(neighborhoods){
//         res.render('admin/newrestaurant', {restaurant: req.body, states: states, cuisine: cuisine, neighborhoods: neighborhoods})
//       })
//     }else{
//       var google = 'https://maps.googleapis.com/maps/api/geocode/json?address='
//       var location = req.body.address + ',' + req.body.city + ',' + req.body.state;
//       request(google + location + '&key=' + process.env.GOOGLE_API, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//           Restaurants().insert({
//             name: req.body.name,
//             city: req.body.city,
//             state: req.body.state,
//             street1: req.body.address,
//             epicenter: jase.results[0].geometry.location,
//             description: req.body.description,
//             img: req.body.img,
//             neighborhood_id: req.body.neighborhood_id
//           }, 'id').then(function(result){
//             console.log(result)
//             res.redirect('/admin')
//           })
//         }
//       })
//     }
//   },
//   updateRestaurant: function(req, res){
//     if(isBlank(req.body)){
//       Neighborhoods().select().then(function(neighborhoods){
//         res.render('admin/newrestaurant', {restaurant: {
//           name: req.body.name,
//           city: req.body.city,
//           state: req.body.state,
//           description: req.body.description,
//           img: req.body.img,
//           street1: req.body.address,
//           neighborhood_id: req.body.neighborhood_id,
//           id: req.params.id,
//         }, states: states, cuisine: cuisine, neighborhoods: neighborhoods})
//       })
//     }else{
//       var google = 'https://maps.googleapis.com/maps/api/geocode/json?address='
//       var location = req.body.address + ',' + req.body.city + ',' + req.body.state;
//       request(google + location + '&key=' + process.env.GOOGLE_API, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//           Restaurants().where('id', req.params.id).update({
//             name: req.body.name,
//             city: req.body.city,
//             state: req.body.state,
//             description: req.body.description,
//             img: req.body.img,
//             street1: req.body.address,
//             neighborhood_id: req.body.neighborhood_id
//           }).then(function(result){
//             res.redirect('/admin')
//           })
//         }
//       })
//     }
//   },
//   deleteRestaurant: function(req, res){
//     Restaurants().where('id', req.params.id).delete().then(function(){
//       res.redirect('/admin')
//     })
//   },
//   createUpdateEmployee: function(req, res){
//     Employees().where('id', req.params.eid).first().then(function(result){
//       Restaurants().where('id', req.params.id).first().then(function(restaurant){
//         res.render('employees/edit', {positions: positions, employee: result, restaurant: {id: req.params.id, name: restaurant.name}})
//       })
//     })
//   },
//   createEmployee: function(req, res){
//     if(isBlank(req.body)){
//       Restaurants().where('id', req.params.id).first().then(function(restaurant){
//         res.render('employees/edit', {employee: req.body, restaurant: restaurant, positions: positions})
//       })
//     }else{
//       Employees().insert({
//         first_name: req.body.first,
//         last_name: req.body.last,
//         position: req.body.position,
//         restaurant_id: req.params.id,
//         performance: req.body.performance
//       }, 'id').then(function(result){
//         res.redirect('/admin/')
//       })
//     }
//   },
//   updateEmployee: function(req, res){
//     if(isBlank(req.body)){
//       res.render('employees/edit', {employee: {
//         first_name: req.body.last,
//         last_name: req.body.last,
//         position: req.body.position,
//         performance: req.body.performance,
//         id: req.params.eid
//       }, positions: positions})
//     }else{
//       Employees().where('id', req.params.eid).update({
//         first_name: req.body.last,
//         last_name: req.body.last,
//         position: req.body.position,
//         performance: req.body.performance
//       }).then(function(result){
//         res.redirect('/admin')
//       })
//     }
//   },
//
//   deleteEmployee: function(req, res){
//     Employees().where('id', req.params.eid).delete().then(function(){
//       res.redirect('/admin/restaurant/' + req.params.id)
//     })
//   }
//
// }
//
//
// module.exports = commands;
//
// function Employees(){
//   return knex('employees');
// }
//
// function Restaurants(){
//   return knex('locations');
// }
//
// function Neighborhoods() {
//   return knex('neighborhoods')
// }
//
// function isBlank(object){
//   for(var item in object){
//     if (object[item] === ""){
//       return true;
//     }
//   }
//   return false;
// }
