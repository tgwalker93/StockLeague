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