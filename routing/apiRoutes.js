
var path 			= require('path');
var db = require("../models");

var request = require("request");


module.exports = function(app){






//TEST API ROUTE USING ROBINHOOD API
app.get("/api/test", function(req, res) {
// ROBINHOOD -------------

//INITIAL ROBINHOOD CREDENTIALS
var credentials = {
    username: 'tgwalker@uci.edu',
    password: 'forthewilling626'
};

var robinhoodAuthToken;

//prestigeworldwide is password for other account specifically for this project, currently pending approval

var Robinhood = require('robinhood')(credentials, function(){
	robinhoodAuthToken = Robinhood.auth_token();
        //      <authenticated alphanumeric token>
});


 // CHANGE CREDENTIALS TO TEMP auth token
 credentials = {
    token: robinhoodAuthToken
};
var Robinhood = require('robinhood')(credentials, function(){
 
    //Robinhood is connected and you may begin sending commands to the api.
 
    Robinhood.fundamentals('CRUS', function(error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
		console.log(body);
		res.json(body);
    });
 
});

});






	//API call to get time series using apla advantage API
	app.get("/api/new/:name", function(req, res) {
		var stocksArray = []
		var newStock;
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





};
