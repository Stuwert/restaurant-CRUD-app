var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
var db = require('knex')(config)

exports.seed = function(knex, Promise) {
  return db('neighborhoods').select().then(function(neighborhoods){
    return Promise.join(
      // Deletes ALL existing entries
      knex('locations').del(),

      // Inserts seed entries
      knex('locations').insert({name:'Yum Yum Good Times', cuisine: 'mexican', img:'/images/mexican.png', street1: '300 North College Street', epicenter: {lat: 44.461333, lng: -93.157795}, street2: null, city: 'Northfield', zip: '55057', state: 'MN', neighborhood_id: neighborhoods[0].id, description: 'An eclectic mix of flavors.'}),
      knex('locations').insert({name:'Everything is Awesome', cuisine: 'thai', img:'/images/thai.jpg', street1: '14800 Buck Hill Rd', epicenter: {lat: 44.7331015, lng: -93.2939347}, street2: null, city: 'Burnsville', zip: '55306', state: 'MN', neighborhood_id: neighborhoods[0].id, description: 'Wonderful little wine bar.'}),
      knex('locations').insert({name:'Binga Banga', cuisine: 'italian', img:'/images/italian.png', street1: '2715 17th Street', epicenter: {lat: 39.761515, lng: -105.0126473}, street2: null, city: 'Denver', zip: '80211', state: 'CO', neighborhood_id: neighborhoods[1].id, description: 'Awesome flavors.'})

    );
  })
};
