var express = require('express')
var router = express.Router();

//Basic login page
router.get('/', function(req, res, next){
  res.render('login/index')
})

router.post('/', function(req, res, next){
  res.cookie('userId', req.body.userId)
  res.redirect('/')
})

router.get('/logout', function(req, res, next){
  res.clearCookie('userId')
  res.redirect('/');
})

module.exports = router;
