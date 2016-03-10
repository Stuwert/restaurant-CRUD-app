var knex = require('../db/knex')

module.exports = {

  renderAllRestaurants: function(callback){
    Restaurants().select().then(function(result){
      callback(result);
    })
  },

  renderSingleRestaurant: function(restaurantid, callback){
    Restaurants().where('id', restaurantid).select().first().then(function(restaurant){
      Meals().where('restaurant_id', restaurantid).select().then(function(meals){
        callback(restaurant, meals)
      })
    })
  },

  createRestaurant: function(obj, callback){
    Restaurants().insert(obj).returning('id').then(function(id){
      callback(id);
    })
  },

  editRestaurant: function(id, obj, callback){
    Restaurants().where('id', id).update(obj).then(function(restaurant){
      callback(restaurant);
    })
  },

  deleteRestaurant: function(id, callback){
    Restaurants().where('id', id).del().then(function(){
      callback();
    })
  },
  getRestaurantsInNeighborhood: function(id, callback){
    Restaurants().where('neighborhood_id', id).then(function(restaurants){
      callback(restaurants);
    })
  }
}

function Restaurants(){
  return knex('locations');
}

function Meals(){
  return knex('meals')
}
