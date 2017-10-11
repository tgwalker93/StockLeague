var path = require('path');
var request = require("request");
var express = require("express");
var passport = require("passport");
var db = require("../../models");
var router = express.Router();
var saveUser = {};


//login route
router.get('/login', (req, res, next) => {
    res.render('login');

    //will test later
    // res.send({
    //   session: req.session,
    //   user: req.user,
    //   authenticated: req.isAuthenticated()
    // })
  })
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))


  //logout route
  router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });
 


  //register route
  router.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
  })
  router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))


  // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  
      // if user is authenticated in the session, carry on 
      if (req.isAuthenticated())
          return next();
      // if they aren't redirect them to the home page
      res.redirect('/');
  }



  module.exports = router;






// var path = require('path');
// var request = require("request");
// var express = require("express");
// var passport = require("passport");
// var db = require("../../models");
// var router = express.Router();
// var saveUser = {};


// //login route
// router.get('/login', (req, res, next) => {
//     res.render('login');

//     //will test later
//     // res.send({
//     //   session: req.session,
//     //   user: req.user,
//     //   authenticated: req.isAuthenticated()
//     // })
//   })
//   router.post('/login', passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/'
//   }))


//   //logout route
//   router.get('/logout', (req, res, next) => {
//     req.session.destroy(err => {
//       res.redirect('/')
//     })
//   })


//   //register route
//   router.get('/register', (req, res, next) => {
//     res.sendFile(path.join(__dirname, "../../public/home.html"));
//   })
//   router.post('/register', passport.authenticate('local-register', {
//     successRedirect: '/profile',
//     failureRedirect: '/'
//   }))


//   // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
  
//       // if user is authenticated in the session, carry on 
//       if (req.isAuthenticated())
//           return next();
  
//       // if they aren't redirect them to the home page
//       res.redirect('/');
//   }



//   module.exports = router;