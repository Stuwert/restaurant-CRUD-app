var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var states = require('../db/states')
var cuisine = require('../db/cuisine')
var positions = require('../db/positions')

var commands = {

  renderAllRestaurants: function(req, res){
    Restaurants().select().table('locations').then(function(result){
      res.render('restaurants/index', {restaurants: result});
    })
  },

  renderSingleRestaurant: function(req, res){
    Restaurants().where('id', req.params.id).first().then(function(result){
      Reviews().where('restaurant_id', req.params.id).then(function(resultz){
        res.render('restaurants/view', {restaurant: result, reviews: resultz});
      })
    })
  },

  createEditReview: function(req, res){
    var reviewid = req.params.reviewid > 0 ? req.params.reviewid : -1;
    Reviews().where('id', reviewid).first().then(function(result){
      Restaurants().where('id', req.params.id).first().then(function(resultz){
        res.render('restaurants/review', {review: result, restaurant: resultz})
      })
    })
  },

  createNewReview: function(req, res){
    console.log(req.body);
    Reviews().insert({
      reviewer_name: req.body.reviewer_name,
      date: new Date(),
      rating: req.body.rating,
      review: req.body.review,
      restaurant_id: req.params.id
    }, 'id').then(function(){
      res.redirect('/restaurant/' + req.params.id)
    })
  },

  deleteReview: function(req, res){
    Reviews().where('id', req.params.reviewid).del().then(function(result){
      res.redirect('/restaurant/' + req.params.id);
    })
  },

  updateReview: function(req, res){
    Reviews().where('id', req.params.reviewid).update({
      reviewer_name: req.body.reviewer_name,
      date: new Date(),
      rating: req.body.rating,
      review: req.body.review,
    }).then(function(result){
      res.redirect('/restaurant/' + req.params.id)
    })
  }
  //
  // read: function(req, res, loc, table){
  //   restaurants(table).select().table(table).then(function(result){
  //     if (table === 'locations'){
  //       restaurants('reviews').select().table('reviews').then(function(resultz){
  //         res.render('restaurants/' + loc, {restaurants: result, reviews: resultz})
  //       })
  //     }else{
  //       res.render('restaurants/' + loc, {restaurants: result})
  //     }
  //   })
  // },
  // readSpec: function(req, res, loc, table){
  //   restaurants(table).where('id', req.params.id).first().then(function(result){
  //     if (loc === 'new'){
  //       res.render('restaurants/' + loc, {restaurants: result, states: states, cuisine: cuisine, action: '/restaurant/' + req.params.id + '/'})
  //     }else if (loc === 'editemployee'){
  //       res.render('restaurants/' + loc, {employee: result, positions: positions, action: '/admin/restaurant/' + req.params.restaurantid + '/employee/' + req.params.id })
  //     }else{
  //       res.render('restaurants/' + loc, {restaurants: result})
  //     }
  //   })
  // },
  //
  // create: function(req, res, table){
  //   var object = {
  //     name: req.body.name,
  //     city: req.body.city,
  //     state: req.body.state,
  //     cuisine : req.body.cuisine,
  //     rating: req.body.rating,
  //     img: req.body.img,
  //     description: req.body.description,
  //   }
  //   restaurants(table).insert(object, 'id').then(function(result){
  //     res.redirect('/');
  //   })
  // },
  //
  // update: function(req, res, table){
  //   var object = {
  //     name: req.body.name,
  //     city: req.body.city,
  //     state: req.body.state,
  //     cuisine : req.body.cuisine,
  //     rating: req.body.rating,
  //     img: req.body.img,
  //     description: req.body.description,
  //   }
  //   restaurants(table).where('id', req.params.id).update(object).then(function(result){
  //     res.redirect('/restaurant/' + req.params.id)
  //   })
  // },
  //
  // delete: function(req, res, table){
  //   restaurants(table).where('id', req.params.id).del().then(function(result){
  //     res.redirect('/')
  //   })
  // },
  //
  // join: function(req, res, db){
  //   restaurants('location').join(db, 'location.id', '=', db + '.restaurant_id').where('id', req.params.id).first().then(function(result){
  //
  //   });
  // },
  //
  // readFilter: function(req, res, loc, table, filter){
  //   restaurants(table).where(filter, req.params.id).then(function(result){
  //     res.render('restaurants/' + loc, {restaurants: result})
  //   })
  // },
  // updateEmployee: function(req, res){
  //   var object = {
  //     first_name: req.body.first,
  //     last_name: req.body.last,
  //     position: req.body.position
  //   }
  //   restaurants('employees').where('id', req.params.id).update(object).then(function(result){
  //     res.redirect('/admin/restaurant/' + req.params.restaurantid + '/employee/' + req.params.id)
  //   })
  // },
  // updateReview: function(req, res){
  //   var object = {
  //     reviewer_name: req.body.reviewer,
  //     date: req.body.date,
  //     rating: req.body.rating,
  //     review: req.body.review
  //   }
  //   restaurants('reviews').where('id', req.params.id).update(object).then(function(result){
  //     res.redirect('/restaurant/' + req.params.restaurantid + '/review/' + req.params.id)
  //   })
  // }


}


module.exports = commands;

function Restaurants(){
  return knex('locations');
}

function Reviews(){
  return knex('reviews');
}
