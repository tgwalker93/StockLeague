var request = require("request");
var math = require('mathjs');

var logic = {
    firstFunction: function(callback, param){
        // do some asynchronous work
        // and when the asynchronous stuff is complete
        logic.getuserPoints(param);    
    },

    getUserPoints: function(userObj) {
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
                var query = "https://www.quandl.com/api/v3/datasets/WIKI/" + stocksArray[i]  + ".json?column_index=4&start_date=" + "2017/10/02" + "&end_date=" + endDate + "&collapse=daily&transform=rdiff&api_key=mduz3V-oEMMBE_BGStxp"
                
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
									if(responses[i].dataset.data>0){
										var x = responses[i].dataset.data[0][1];
									}else{
										var x = 0;
									}
									
									userStockPercentage.push((x).toFixed(4)*100);
									userPoints.push((x).toFixed(4)*100*100);
								}
								var totalPoints = math.sum(userPoints);
								var userStockPoints = {
									stock1PercentChange: userStockPercentage[0],
									stock1Points: userPoints[0],
									stock2PercentChange: userStockPercentage[1],
									stock2Points: userPoints[1],
									stock3PercentChange: userStockPercentage[2],
									stock3Points: userPoints[2],
									totalPoints: totalPoints
                                }
                                console.log("I'm in serverside logic");
								return userStockPoints;
								
								


                            }
            
						
                            
                        }else{
                            console.log("i'm in request, but this didn't work!");
                        }
					
					
					});

				}
        
    },

    getCurrentDate: function() {
        var today = new Date();
        // var dd = today.getDate();
        // var mm = today.getMonth()+1; //January is 0!
        // var yyyy = today.getFullYear();
        
        // if(dd<10) {
        //     dd = '0'+dd
        // } 
        
        // if(mm<10) {
        //     mm = '0'+mm
        // } 
        
        // today = dd + '/' + mm + '/' + yyyy;
        return today.toISOString().split('T')[0];
    }
}
module.exports = logic;

