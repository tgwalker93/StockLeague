$(document).ready(function() {
    var stock;
    var allStocks = [];
  $("#submit").on("click", function(event) {
        event.preventDefault();
        stock = {
          name: $("#name").val().trim(),

        };

        console.log(stock.name)

    
        // $.post("/api/new", stock)
        // .done(function(data) {
        //   console.log(data);
        //   console.log(stock);
        // });
        console.log("At getPosts();")
        getPosts();



    //     $.get("/api/new").done(function(data) {

    //         console.log(data)
    //  });

      });

        // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
//   postCategorySelect.on("change", handleCategoryChange);
  var posts;



      function getPosts() {
    
        $.get("/api/new/" + stock.name, function(data) {
          
          
          stock = {
              ticker: data.ticker,
              price: data.price
          }
        //   allStocks.append(stock);
          createNewRow(stock);
        });
      }


      function createNewRow(stock) {
        var newPostPanel = $("<div>");
        newPostPanel.addClass("panel panel-default");
        var newPostPanelHeading = $("<div>");
        newPostPanelHeading.addClass("panel-heading");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-default");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostCategory = $("<h5>");
        newPostCategory.text(stock.name);
        newPostCategory.css({
          float: "right",
          "font-weight": "700",
          "margin-top":
          "-15px"
        });
       
        newPostTitle.text("Stock Ticker: " + stock.ticker + "             ||              Last Closing Stock Price: " + stock.price);
        
   
        newPostTitle.append(newPostDate);
        newPostPanelHeading.append(deleteBtn);
        newPostPanelHeading.append(newPostTitle);
        newPostPanel.append(newPostPanelHeading);
        // newPostPanel.data("stock", stock);

        console.log(newPostPanel);

        $("#stocksView").append(newPostPanel);
        return newPostPanel;
      }


      function handlePostDelete() {
        var currentPost = $(this)
        console.log(currentPost)
        //   .parent()
        //   .parent()
        //   .data("post");
        // deletePost(currentPost.id);
      }


      function handlePostEdit() {
        var currentPost = $(this)
          .parent()
          .parent()
          .data("post");
        window.location.href = "/cms?post_id=" + currentPost.id;
      }

      function displayEmpty() {
        blogContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
        blogContainer.append(messageh2);
      }


    });