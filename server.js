var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var apiRoutes = require("./server/routing/apiRoutes")
var passport = require("passport");
var account = require("./server/routing/account");
var htmlRoutes = require("./server/routing/htmlRoutes");
var session = require("express-session");

var port = process.env.PORT || 3000;
// Requiring our models for syncing
var db = require("./models");
var app = express();



// var passport2 = require('./server/passport')(passport);
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE


//Set up middleware for express
app.use(methodOverride("_method"));
app.use(bodyParser.json()) // For ajax
app.use(bodyParser.urlencoded({extended: false})) // For html forms
app.use(session({ secret: "THIS IS A SECRET", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
require('./server/passport')(passport);



app.use(apiRoutes);
app.use(htmlRoutes);
app.use(account);









db.sequelize.sync().then(function() {
    app.listen(port, function() {
      console.log("App listening on PORT " + port);
    });
  });
  
