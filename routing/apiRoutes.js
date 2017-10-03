
var path 			= require('path');
var db = require("../models");

var request = require("request");


module.exports = function(app){


//API POST Request-handles when user submits a form & thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate Javascript array
var stocksArray = []


	var newStock;
	app.get("/api/new/:name", function(req, res) {
		var query = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + req.params.name + "&apikey=PF2NNSQ4ASZPFCSK"

		request(query, function(error, response, body) {

				// If the request is successful
				if (!error && response.statusCode === 200) {

					// Parse the body of the site and recover just the imdbRating
					// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
					var resultObj = JSON.parse(body)['Time Series (Daily)']

					var secondKey = Object.keys(resultObj)[0]

					var lastClosingPrice = resultObj[secondKey]['4. close']

					console.log("SHOULD BE LATEST STOCK PRICE: " + resultObj[secondKey]['4. close']);
					newStock = {
						ticker: req.params.name,
						price: lastClosingPrice
            // price: req.params.price

					}
					res.json(newStock)
					stocksArray.push();
				}
			});
	  });




	  // POST route for saving a new post
	  app.post("/api/createProfile", function(req, res) {
		console.log(req.body);
		db.User.create({
		  username: req.body.username,
		  password: req.body.password,
		  stock1: req.body.stock1,
		  stock2: req.body.stock2,
		  stock3: req.body.stock3,
		  teamName: ""
		})
		.then(function(dbPost) {
		  res.json(dbPost);
		});
	  });

    app.post("/api/createTeam", function(req, res) {
		console.log(req.body);
		db.Team.create({
		  username: req.body.username,
		  // teamname: req.body.password,
		  stock1: req.body.stock1,
      stock1value: req.body.stock1value,
		  stock2: req.body.stock2,
      stock2value: req.body.stock2value,
		  stock3: req.body.stock3,
      stock3value: req.body.stock3value,
		  teamName: ""
		})
		.then(function(dbPost) {
		  res.json(dbPost);
		});
	  });





};
