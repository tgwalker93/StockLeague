var express = require("express");
var models = require('../models');


var sequelize = require("../config/connection.js");
var router = express.Router();

// var burger = require('../models/burger.js');
var Burger = models.Burger

console.log(Burger);
// var User = require('../models/burger')(sequelize, DataTypes);


router.get("/", function(req, res) {
  // burger.all(function(data) {
    Burger.findAll({}).then(function(results) {
      console.log(results)
      // results are available to us inside the .then
      // res.json(results);
      res.render("index", {burgers: results});
    });

    
  // });
});

router.post("/", function(req, res) {

  Burger.create({  
    burger_name: req.body.name,
    devoured: req.body.devoured
  })
  .then(function(results) {
    res.render("index", results);
  }).catch(function(err){
    res.send(err)
  })
  });


router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  // burger.update({
  //   devoured: req.body.devoured
  // }, condition, function() {
    res.redirect("/");
  // });
});

// Export routes for server.js to use.
module.exports = router;

