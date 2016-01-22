
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('reviews').del(),

    // Inserts seed entries
    knex('reviews').insert({created_at: new Date(), reviewer_name: "Sam Smith", rating: 3, restaurant_id: 1, review: 'Pretty good.  Would go there again.' }),
    knex('reviews').insert({created_at: new Date(), reviewer_name: "John Burgess", rating: 3, restaurant_id: 2, review: 'Wouldnt go back, but did enjoy it. '}),
    knex('reviews').insert({created_at: new Date(), reviewer_name: "Adam Ventura", rating: 4, restaurant_id: 3, review: 'Terrible' }),
    knex('reviews').insert({created_at: new Date(), reviewer_name: "Sean Ventura", rating: 2, restaurant_id: 3, review: 'Bing Bong' })

  );
};
