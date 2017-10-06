$(document).ready(function() {

    //current stock searched
    var stock;

    //This array will store all stocks pulled locally.
    var allStocks = [];

    var userProfile = {
        username: "",
        password: "",
        stock1: "",
        stock2: "",
        stock3: "",
        teamName: ""
    }


    //call api, pull stock
  $("#search").on("click", function(event) {
        event.preventDefault();
        stock = {
          name: $("#name").val().trim(),

        };
        getStock();
      });



    $("#createProfile").on("click", function(event) {
        event.preventDefault();
        userProfile = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim(),
            // stock1: allStocks[0].ticker,
            // stock2: allStocks[1].ticker,
            // stock3: allStocks[2].ticker,
            // teamName: ""

        };
        console.log("USER PROFILE")
        console.log(userProfile);
        createProfile();
      });


  // Click events for delete buttons
  $(document).on("click", "button.delete", handlePostDelete);



      function getStock() {

        $.get("/api/new/" + stock.name, function(data) {


          stock = {
              ticker: data.ticker,
              price: data.price
          }
            allStocks.push(stock);
            console.log(allStocks);
            console.log(allStocks[0])
            console.log(allStocks[1])
          createNewRow(stock);
        });
      }


      function createProfile() {
            // $.post("/api/createProfile", userProfile, function() {
            //     window.location.href = "/profile";

            // });

              $.post("/register", userProfile, function() {
                // window.location.href = "/profile";

            });
          }



      function createNewRow(stock) {

        //panel
        var newPostPanel = $("<div>");
        newPostPanel.addClass("panel panel-default");
        newPostPanel.attr("data-stock", stock.ticker);

        //heading
        var newPostPanelHeading = $("<div>");
        newPostPanelHeading.addClass("panel-heading");

        //Delete button
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");

        //title
        var newPostTitle = $("<h2>");
        newPostTitle.text("Stock Ticker: " + stock.ticker + "             ||              Last Closing Stock Price: " + stock.price);

        newPostPanelHeading.append(deleteBtn);
        newPostPanelHeading.append(newPostTitle);
        newPostPanel.append(newPostPanelHeading);
        newPostPanel.data("stock", stock);

        $("#stocksView").append(newPostPanel);
        return newPostPanel;
      }


      function handlePostDelete() {
        var chosenStock = $(this).parent().parent().attr("data-stock");
        //FOR LOOP TO DELETE STOCK STORED IN GLOBAL ARRAY
        for(i=0;i<allStocks.length; i++) {
            if(allStocks[i].ticker === chosenStock) {
                console.log("TICKER TO BE DESTROYED: " + allStocks[i].ticker)
                allStocks.splice(i, 1);
                break;
            }
        }
        //DELETES THE DIV THAT CONTAINS STOCK
        $(this).parent().parent().remove()
      }


    });
