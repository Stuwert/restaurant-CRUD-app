var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
var db = require('knex')(config)

exports.seed = function(knex, Promise) {
  return db('locations').select().then(function(restaurants){
    return Promise.join(
      // Deletes ALL existing entries
      knex('reviews').del(),

      // Inserts seed entries
      knex('reviews').insert({created_at: new Date(), reviewer_name: "Sam Smith", rating: 3, restaurant_id: restaurants[0].id, review: 'Pretty good.  Would go there again.' }),
      knex('reviews').insert({created_at: new Date(), reviewer_name: "John Burgess", rating: 3, restaurant_id: restaurants[1].id, review: 'Wouldnt go back, but did enjoy it. '}),
      knex('reviews').insert({created_at: new Date(), reviewer_name: "Adam Ventura", rating: 4, restaurant_id: restaurants[2].id, review: 'Terrible' }),
      knex('reviews').insert({created_at: new Date(), reviewer_name: "Sean Ventura", rating: 2, restaurant_id: restaurants[2].id, review: 'Bing Bong' })
    );
  })
};
