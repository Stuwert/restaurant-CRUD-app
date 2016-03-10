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

  readNeighborhood: function(id, callback){
    Neighborhoods().where('id', id).first().then(function(neighborhoods){
      console.log(neighborhoods);
      callback(neighborhoods);
    })
  },

  readAllNeighborhoods:function(callback){
    Neighborhoods().select().then(function(results){
      callback(results);
    })
  },

  createNeighborhood: function(obj, callback1, callback2){
    var google = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    var location = obj.address + ',' + obj.city + ',' + obj.state;
    request(google + location + '&key=' + process.env.GOOGLE_API, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var newResp = jase.results[0].address_components
        Neighborhoods().insert({
          name: obj.name,
          epicenter: jase.results[0].geometry.location,
          county: newResp[3].long_name,
          city: newResp[2].long_name,
          state: newResp[4].short_name,
        }).then(function(){
          callback1();
        })
        callback2(jase.results[0].geometry.location)
      }
    })
  },

  editNeighborhood: function(id, callback){
    Neighborhoods().where('id', id).first().then(function(neighborhood){
      callback(neighborhood);
    })
  },

  updateNeighborhood: function(id, obj, callback){
    Neighborhoods().where('id', id).update(obj).then(function(neighborhood){
      callback(neighborhood);
    })
  }
}

function Neighborhoods(){
  return knex('neighborhoods');
}

function Restaurants(){
  return knex('locations')
}
