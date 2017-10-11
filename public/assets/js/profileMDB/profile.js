  var userData = {
        
    }
function getUserData() {
    $.get("/account/user", function(data) {
        userData = data;
        if(userData.username){
            displayUserStocks();
            displayUsername();
            calculateUserPoints();

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
function displayUsername() {
    $("#username").html(userData.username);
}
function calculateUserPoints(){
    // Grab the URL of the website
    var currentURL = window.location.origin;
    $.get(currentURL+"/api/getProfilePoints", userData, function(data) {
        $("#stock1Percent").html(data.stock1PercentChange.toFixed(2)+"%")
        $("#stock1Points").html(data.stock1Points.toFixed(0))
        $("#stock2Percent").html(data.stock2PercentChange.toFixed(2)+"%")
        $("#stock2Points").html(data.stock2Points.toFixed(0));
        $("#stock3Percent").html(data.stock3PercentChange.toFixed(2)+"%")
        $("#stock3Points").html(data.stock3Points.toFixed(0))
        $("#points").html(data.totalPoints);
    });
}
getUserData();





function csvJSON(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for(var i=1; i<lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(',');
        for(var j=0; j<headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result);
}


$('.portfolioSymbol').click(function() {
    displayChart((this.text).trim());

});

function displayChart(symbol) {
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() {
                if(anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }
            anHttpRequest.open('GET', aUrl, true);
            anHttpRequest.send(null);
        }
    };

    var client = new HttpClient(); 

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    function drawChart() {
        client.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&apikey=RJKE5HTMO75D6W3M&outputsize=compact&datatype=csv", function(response){
        var timeseries = csvJSON(response);
        var timeseriesJSON = JSON.parse(timeseries);
        var arr = [];
        for(var record=0; record<20; record++) {
            if(timeseriesJSON.hasOwnProperty(record)) {
                var arrRecord = [];
                if(!(timeseriesJSON[record].timestamp == "")) {
                    arrRecord.push(timeseriesJSON[record].timestamp);
                    arrRecord.push(parseFloat(timeseriesJSON[record].low));
                    arrRecord.push(parseFloat(timeseriesJSON[record].open));
                    arrRecord.push(parseFloat(timeseriesJSON[record].close));
                    arrRecord.push(parseFloat(timeseriesJSON[record].high));

                    arr.push(arrRecord);
                }
            }
        }
        var data = google.visualization.arrayToDataTable(arr, true)
        var options = {
            backgroundColor: '#212121',
            titleTextStyle: {
                color: '#ffa726',
                fontSize: 12
            },
                title: symbol,
                legend: 'none',
                hAxis: {
                    textPosition: 'none',
                    // title: 'Year', 
                    // titleTextStyle:
                    //  {color: 'red'},
                },
                candlestick: {
                    fallingColor: {
                        fill: '#ff0000',
                        stroke: '#ff0000',
                        strokeWidth: 1
                    },
                    risingColor: {
                        fill: '#008000',
                        stroke: '#008000',
                        strokeWidth: 1
                    }
                },
                vAxis: {
                    textStyle: {
                        color:'#c0ca33'
                    }
                },
                reverseCategories: true,
                height: 160                                           
            };

        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
          chart.draw(data, options);
    });
    }    
    $(window).resize(function(){
        drawChart();
    });     
}
