getUserData();

 var userData = {

 }
 
function getUserData() {
$.get("/account/user", function(data) {
  userData = data;
  if(userData.username){
      displayUserStocks();


  }
});
}


function displayUserStocks() {
console.log("User stocks:")
console.log(userData);
  $("#stock1").html(userData.stock1);
  $("#stock2").html(userData.stock2);
  $("#stock3").html(userData.stock3);
}
 
 $("#search").on("click", function(event) {
    event.preventDefault();
    var stock = {
      name: $("#stockName").val().trim(),

    };
    getStock(stock);
  });


  function getStock(stock) {
    
            $.get("/api/trade/" + stock.name, function(data) {
    
    
              // stock = {
              //     ticker: data.ticker,
              //     price: data.price
              // }
              //   allStocks.push(stock);
              //   console.log(allStocks);
              //   console.log(allStocks[0])
              //   console.log(allStocks[1])
              // createNewRow(stock);
            });
          }
