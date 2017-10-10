function getLeagueData() {
    
        $.get("/api/calculateLeague", function(data) {
            userData = data;
            console.log("League points updated:");
            console.log(data);
            data.sort(function(a, b){
                return a.totalPoints-b.totalPoints
            })
            console.log("data after sorted");
            console.log(data);
            $("#teamHeader").html(data[0].teamName);
            for(i=0;i<data.length;i++) {
                if(data[i] && i<=5){
                    var num = i + 1;
                    console.log("Num is " + num );
                    var currentName = "#name" + num;
                    var currentPoints = "#points" + num;
                    console.log(currentName);
                    console.log(currentPoints);
                    console.log("I is" + i);
                    $(currentName).html(data[i].username)
                    $(currentPoints).html(data[i].totalPoints)
                    if(data[i].isAuthUser){
                        $("#yourPoints").html(data[i].totalPoints);
                    }
                }
            }
          

            
          });
    }

    

getLeagueData();


//Event handler for "Create Team" button
$('#btnCreateTeam').click(function(){
    var teamName = $('#idTeamNameTxt').val().trim();
    
    if(teamName === null || teamName === "") {
        alert("Please provide valid team name!");
    } else {
        alert("valid team name");
    }
});

//Event handler for "Join Team" button
$('#btnJoinTeam').click(function() {
    //call orm function to attach team to the user
});


//Event handler for "Quit Team" button
$('#btnQuitTeamYes').click(function() {
    //call orm function to remove the mapping of team and user
})

var getTeamLeaderBoard = function() {
    //call orm function to get the team leader board from db
    //once we get the data we will populate the model for Team Leader Board
};