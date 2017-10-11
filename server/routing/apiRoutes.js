var path = require('path');
var db = require("../../models");
var request = require("request");
var express = require("express");
var passport = require("passport");
var logic = require("../serverSideLogic");
var router = express.Router();
var math = require('mathjs');







//req._passport.session.user is the id that is stored in the cookie, which was sent to the client when we did "serialize" in passport.js
//using the user ID from cookie to call info from DB
router.get("/account/user", function(req, res) {
	db.User.findOne({
		where: {
		  id: req._passport.session.user
		}
	  }).then(function(user) {
			saveUser = {
				username: user.username,
				password: user.password,
				stock1: user.stock1,
				stock2: user.stock2,
			stock3: user.stock3,
			teamName: user.teamName
		  }
    res.json(saveUser);
});

})

router.get("/api/calculateLeague", function(req, res){
	logic.counter = 0;
	var userId = req._passport.session.user
	var authUser = req.user[userId-1].dataValues;
	logic.leagueArray = [];
	db.User.findAll({
		where: {
		  teamName: authUser.teamName
		}
	  }).then(function(user) {

			//user is array of all members in the league
			logic.getUserPoints(user, res, userId, true, user.length);	
			
	  })
});
router.get("/api/getProfilePoints", function(req, res) {
			var userId = req._passport.session.user;
			var userObj = req.user[userId-1].dataValues;
			logic.getUserPoints(userObj, res, userId, false, 1);

});



//TEST API ROUTE USING ROBINHOOD API
router.get("/api/test", function(req, res) {

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
	router.get("/api/new/:name", function(req, res) {
		var stocksArray = []
		var newStock;
		// var query = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + req.params.name + "&apikey=PF2NNSQ4ASZPFCSK"
		var query = "https://www.quandl.com/api/v3/datasets/WIKI/" + req.params.name + "/data.json?column_index=4&exclude_column_names=true&rows=3&start_date=2017/10/01&order=desc&collapse=daily"
		request(query, function(error, response, body) {
				
				// If the request is successful
				if (!error && response.statusCode === 200) {
					var resultObj = JSON.parse(body)
					if(resultObj){
	
					var lastClosingPrice = resultObj["dataset_data"]["data"][0][1];
					
					console.log("SHOULD BE LATEST STOCK PRICE: " + lastClosingPrice);
					newStock = {
						ticker: req.params.name,
						price: lastClosingPrice
	
					}
					res.json(newStock)
					stocksArray.push();

					}

				}
			});
	  });


	  	//API call to get time series using apla advantage API
	router.get("/api/tradeSearch/:name", function(req, res) {
		var stocksArray = []
		var newStock;
		// var query = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + req.params.name + "&apikey=PF2NNSQ4ASZPFCSK"
		var query = "https://www.quandl.com/api/v3/datasets/WIKI/" + req.params.name + "/data.json?column_index=4&exclude_column_names=true&rows=3&start_date=2017/10/01&order=desc&collapse=daily"
		request(query, function(error, response, body) {
				
				// If the request is successful
				if (!error && response.statusCode === 200) {
					var resultObj = JSON.parse(body)
					if(resultObj){
	
					var lastClosingPrice = resultObj["dataset_data"]["data"][0][1];
					
					console.log("SHOULD BE LATEST STOCK PRICE: " + lastClosingPrice);
					newStock = {
						ticker: req.params.name,
						price: lastClosingPrice
	
					}
					res.json(newStock)
					stocksArray.push();

					}

				}
			});
	  });


		module.exports = router;
