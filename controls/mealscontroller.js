var knex = require('../db/knex')

module.exports = {

  createMeal: function(obj, callback){
    Meal().insert(obj).returning('id').then(function(id){
      callback(id);
    })
  },

  editMeal: function(id, obj, callback){
    Meal().where('id', id).update(obj).then(function(meal){
      callback(meal);
    })
  },

  readMeal: function(id, callback){
    Meal().where('id', id).first().then(function(meal){
      Reviews().where('meal_id', id).then(function(reviews){
        callback(meal, reviews);
      })
    })
  },

  deleteMeal: function(id, callback){
    Meal().where('id', id).del().then(function(){
      callback();
    })
  }

}


function Meal(){
  return knex('meals');
}

function Reviews(){
  return knex('reviews');
}
