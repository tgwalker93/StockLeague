// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

var db = require("../../models");

var request = require("request");
var express = require("express");
var passport = require("passport");
var router = express.Router();

// ===============================================================================
// ROUTING
// ===============================================================================

  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
  });
  router.get("/createAccount", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/createAccount.html"));
  });

  router.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/profile.html"));
  });
  router.get("/profile2", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/profile2.html"));
  });
  router.get("/profile3", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/profile3.html"));
  });

  router.get("/profile4", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/profile4.html"));
  });

  router.get("/stockDetails", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/stockDetails.html"));
  });

  router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/login.html"));
  });

  // If no matching route is found default to home
  router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
  });


  module.exports = router;
