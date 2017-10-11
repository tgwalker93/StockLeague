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


router.get("/api/getProfilePoints", function(req, res) {
			var userId = req._passport.session.user;
			var userObj = req.user[userId-1].dataValues;


            var stock1 = userObj.stock1;
            var stock1Date = userObj.stock1Date;
            var stock2Date = userObj.stock2Date;
            var stock2 = userObj.stock2;
            var stock3Date = userObj.stock3Date;
            var stock3 = userObj.stock3;
            var stocksArray = [stock1, stock2, stock3];
            var datesArray = [stock1Date, stock2Date, stock3Date]
            var endDate = logic.getCurrentDate();
            var responses = [];
            var completed_requests = 0;
            for(i=0;i<stocksArray.length; i++){
				//CHANGE START DATE FOR TESTING IF IT WORKS WHEN USER REGISTERS OTHERWISE IT WILL JUST SHOW A ZERO
                var query = "https://www.quandl.com/api/v3/datasets/WIKI/" + stocksArray[i]  + ".json?column_index=4&start_date=" + "2017-10-02"+ "&end_date=" + endDate + "&collapse=daily&transform=rdiff&api_key=mduz3V-oEMMBE_BGStxp"

                    request(query, function(error, response, body) {
                        // If the request is successful
                        if (!error && response.statusCode === 200) {
                            var result = JSON.parse(body);
                            responses.push(result)
                            completed_requests++;
                            if(completed_requests === stocksArray.length){
								console.log("All API calls have been made!");
								var userStockPercentage = [];
								var userPoints = [];
								for(i=0; i<responses.length; i++){
									console.log("Start date is " + responses[i].dataset.start_date);
									console.log("End date is " + responses[i].dataset.end_date);
									if(responses[i].dataset.data.length>0){
										var x = responses[i].dataset.data[0][1];
									}else{
										var x = 0;
									}

									userStockPercentage.push((x).toFixed(4)*100);
									userPoints.push((x).toFixed(4)*100*100);
								}
								var totalPoints = math.sum(userPoints);
								if(totalPoints<0){
									totalPoints = 0;
								}
								var userStockPoints = {
									stock1PercentChange: userStockPercentage[0]||0,
									stock1Points: userPoints[0]||0,
									stock2PercentChange: userStockPercentage[1]||0,
									stock2Points: userPoints[1]||0,
									stock3PercentChange: userStockPercentage[2]||0,
									stock3Points: userPoints[2]||0,
									totalPoints: totalPoints
								}
								var currentDate = logic.getCurrentDate();
								db.User.update({
									profilePoints: userStockPoints.totalPoints,
									lastLogin: currentDate
								  }, {
									where: {
									  id: userId
									}
								  }).then(function(){

									res.json(userStockPoints);

								  });


                            }

                        }else{
                            console.log("i'm in request, but this didn't work!");
                        }

					});

				}

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
		var query = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + req.params.name + "&apikey=PF2NNSQ4ASZPFCSK"

		request(query, function(error, response, body) {

				// If the request is successful
				if (!error && response.statusCode === 200) {
					var resultObj = JSON.parse(body)['Time Series (Daily)']
					if(resultObj){

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
				}
			});
	  });


		module.exports = router;
