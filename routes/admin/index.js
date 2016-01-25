var express = require('express');
var controller = require('../../controls/admincontroller')
var router = express.Router();


router.use(function(req, res, next){
  if(req.cookies.userId === 'admin'){
    next();
  }else{
    res.redirect('/login')
  }
})

//View all restaurants and employees
router.get('/', controller.readAll);




module.exports = router;
