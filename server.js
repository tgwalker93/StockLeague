var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var port = process.env.PORT || 3000;
// Requiring our models for syncing
var db = require("./models");
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));



require("./server/routing/apiRoutes")(app);
require("./server/routing/htmlRoutes")(app);


db.sequelize.sync().then(function() {
    app.listen(port, function() {
      console.log("App listening on PORT " + port);
    });
  });
  
