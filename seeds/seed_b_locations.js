var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
var db = require('knex')(config)

exports.seed = function(knex, Promise) {
  return db('neighborhoods').select().then(function(neighborhoods){
    return Promise.join(
      // Deletes ALL existing entries
      knex('locations').del(),

      // Inserts seed entries
      knex('locations').insert({name:'Yum Yum Good Times', cuisine: 'mexican', img:'/images/mexican.png', street1: '12417 12th Street East', epicenter: {lat: 47.246763, lng: -122.2646683}, street2: null, city: 'Edgewood', zip: '98372', state: 'WA', neighborhood_id: neighborhoods[1].id, description: 'An eclectic mix of flavors.'}),
      knex('locations').insert({name:'Everything is Awesome', cuisine: 'thai', img:'/images/thai.jpg', street1: '12523 12th Street East', epicenter: {lat: 47.246739, lng: -122.2635883}, street2: null, city: 'Edgewood', zip: '98372', state: 'WA', neighborhood_id: neighborhoods[1].id, description: 'Wonderful little wine bar.'}),
      knex('locations').insert({name:'Binga Banga', cuisine: 'italian', img:'/images/italian.png', street1: '2715 17th Street', epicenter: {lat: 39.761515, lng: -105.0126473}, street2: null, city: 'Denver', zip: '80211', state: 'CO', neighborhood_id: neighborhoods[0].id, description: 'Awesome flavors.'})

    );
  })
};
