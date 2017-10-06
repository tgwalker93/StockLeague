//THIS FILE IS NOT BEING USED, THIS WAS SUPPOSED TO BE SERVER SIDE CODE



var request = require("request");
var express = require("express");

var path = require('path');
var db = require("../../models");

var passport = require("passport");
var router = express.Router();

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated()
    })
  });
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/login'
  }))


  router.post('/register', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

export default router;