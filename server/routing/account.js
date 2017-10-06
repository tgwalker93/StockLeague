var request = require("request");
var express = require("express");
var passport = require("passport");
var db = require("../../models");
var router = express.Router();


router.get('/login', (req, res, next) => {
    res.render('login');
  })
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
  router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      res.redirect('/login')
    })
  })

  router.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
  })
  router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/login',
  }))
    

  module.exports = router;