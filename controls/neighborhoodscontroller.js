var knex = require('../db/knex')


/* GET home page. */

module.exports = {

  // readNeighborhood: function(req,res){
  //   Neighborhoods().where('id', req.params.id).first().then(function(result){
  //     Restaurants().where('neighborhood_id', req.params.id).then(function(restaurants){
  //       res.render('neighborhood/view', {title: result.name, epicenter: result.epicenter, restaurants: restaurants})
  //     })
  //   })
  // },

  readAllNeighborhoods:function(callback){
    Neighborhoods().select().then(function(results){
      callback(results);
    })
  }

  // createNeighborhood: function(req, res){
  //   if (isBlank(req.body)){
  //     res.render('neighborhood/create', {neighborhood: req.body, states: states})
  //   }else{
  //     var google = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  //     var location = req.body.address + ',' + req.body.city + ',' + req.body.state;
  //     request(google + location + '&key=' + process.env.GOOGLE_API, function (error, response, body) {
  //       if (!error && response.statusCode == 200) {
  //         var jase = JSON.parse(body);
  //         var newResp = jase.results[0].address_components
  //         Neighborhoods().insert({
  //           name: req.body.name,
  //           epicenter: jase.results[0].geometry.location,
  //           county: newResp[3].long_name,
  //           city: newResp[2].long_name,
  //           state: newResp[4].short_name,
  //         }).then(function(){
  //           res.redirect('/admin')
  //         })
  //         res.render('index', {location: jase.results[0].geometry.location})
  //       }
  //     })
  //   }
  // },
  // createFormNeighborhood: function(req, res){
  //   res.render('neighborhood/create', {states: states})
  // },
  // editNeighborhood: function(req, res){
  //   Neighborhoods().where('id', req.params.id).first().then(function(neighborhood){
  //     res.render('neighborhood/edit', {neighborhood: neighborhood, states: states})
  //   })
  // },
  // updateNeighborhood: function(req, res){
  //   if (isBlank(req.body)){
  //     res.render('neighborhood/edit', {neighborhood: {
  //       epicenter: req.body.epicenter,
  //       name: req.body.name,
  //       city: req.body.city,
  //       state: req.body.state,
  //       id: req.params.id
  //     }, states: states})
  //   }
  //   Neighborhoods().where('id', req.params.id).update({
  //     epicenter: req.body.epicenter,
  //     name: req.body.name,
  //     city: req.body.city,
  //     state: req.body.state
  //   }).then(function(){
  //     res.redirect('/admin')
  //   })
  // }

}

function Neighborhoods(){
  return knex('neighborhoods');
}

function Restaurants(){
  return knex('locations')
}
