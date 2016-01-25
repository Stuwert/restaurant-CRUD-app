var express = require('express')
var router = express.Router();

//Basic login page
router.get('/', function(req, res, next){
  res.render('login/index')
})

module.exports = router;
