var express = require('express')
var router = express.Router();

//Auto redirects index to restaurants
router.get('/', function(req, res, next){
  res.render('head')
})

module.exports = router;
