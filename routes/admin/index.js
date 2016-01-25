var express = require('express');
var controller = require('../../controls/admincontroller')
var router = express.Router();


router.use(function(req, res, next){
  console.log(req.cookies.userId);
  if(req.cookies.userId === 'admin'){
    next();
  }else{
    res.redirect('/login')
  }
})

//View all restaurants and employees
router.get('/', controller.readAll);




module.exports = router;
