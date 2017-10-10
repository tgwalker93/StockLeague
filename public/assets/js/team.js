console.log("i'm in the team.js file");

function getLeagueData() {
    
        $.get("/api/calculateLeague", function(data) {
            userData = data;
            console.log(data);


            // if(userData.username){
            //     displayUserStocks();
            //     displayUsername();
            //     calculateUserPoints();
    
            // }
          });
    }

    

getLeagueData();