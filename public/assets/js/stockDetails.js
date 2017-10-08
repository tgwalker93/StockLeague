//make the call on the front-end and get the data! 
$("#test").on("click", function (event) {
  $.get("/api/test", function (data) {


    console.log(data.results[0]);
    console.log(data.results[0][1])
    $("#body").html("<p>" + JSON.stringify(data.results[0]) + " </p>");




  });
});