var knex = require('../db/knex')

module.exports = {

  createReview: function(obj, callback){
    Reviews().insert(obj).returning('id').then(function(id){
      callback(id);
    })
  },

  updateReview: function(id, obj, callback){
    Reviews().where('id', id).update(obj).then(function(review){
      callback(review);
    })
  },

  readReview: function(id, callback){
    Reviews().where('id', id).first().then(function(review){
      callback(review);
    })
  },

  deleteReview: function(id, callback){
    Reviews.where('id', id).del().then(function(){
      callback();
    })
  }

}

function Reviews(){
  return knex('reviews');
}
