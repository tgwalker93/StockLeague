var request = require("request");
var math = require('mathjs');
var db = require('../models');


var logic = {
    counter: 0,
    //This is an array of each obj returned for each member of a league in getUserPoints
    leagueArray: [],

    getUserPoints: function(userObj, res, authUserId, repeat, howManyCalls) {
            var repeatUserObj = userObj;
            var repeatUserObjLength = repeatUserObj.length;
            if(repeat){
                userObj = userObj[logic.counter].dataValues;
                logic.counter += 1;
            }
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
				//CHANGE START DATE FOR TESTING IF IT WORKS WHEN USER REGISTERS OTHERWISE IT WILL JUST SHOW A ZERO  "2017-10-02"
                var query = "https://www.quandl.com/api/v3/datasets/WIKI/" + stocksArray[i]  + ".json?column_index=4&start_date=" + datesArray[i]+ "&end_date=" + endDate + "&collapse=daily&transform=rdiff&api_key=mduz3V-oEMMBE_BGStxp"
                
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
                                var newUserPoints = userStockPoints.totalPoints + userObj.totalPoints;
								//update user profile with user points
								db.User.update({
									profilePoints: userStockPoints.totalPoints,
									lastLogin: currentDate
								  }, {
									where: {
									  id: userObj.id
									}
								  }).then(function(){
                                    if(userObj.id===authUserId && repeat===true){
                                        userStockPoints["isAuthUser"] = true;
                                    }
                                    if(!repeat){
                                        res.json(userStockPoints);
                                        return;
                                    }else if(logic.counter!==repeatUserObjLength){
                                        userStockPoints["id"] = userObj.id;
                                        userStockPoints["username"] = userObj.username;
                                        userStockPoints["teamName"] = userObj.teamName;
                                        logic.leagueArray.push(userStockPoints);
                                        logic.getUserPoints(repeatUserObj, res, authUserId, true, repeatUserObjLength);
                                        return;
                                    }else if(logic.counter === repeatUserObjLength) {
                                        userStockPoints["id"] = userObj.id;
                                        userStockPoints["username"] = userObj.username;
                                        userStockPoints["teamName"] = userObj.teamName;
                                        logic.leagueArray.push(userStockPoints);
                                        if(res.json){
                                            res.json(logic.leagueArray);
                                        }
                                        return;
                                    }else{
                                        console.log("Something went wrong. I should NOT be here.");
                                    }
									

								  });
								
																
                            }
                                       
                        }else{
                            console.log("i'm in request, but this didn't work!");
                            if(res.json){
                                res.json(logic.leagueArray);
                            }
                        }
							
					});

            	}
        
        
    },

    getCurrentDate: function() {
        var today = new Date();
        return today.toISOString().split('T')[0];
    }
}
module.exports = logic;

