(function($) {
  $('#search').typeahead({
    name: 'security-master',
    prefetch: 'assets/data/symbols.json',
    template: [
      '<span class="master-symbol">{{symbol}}</span>',
      ' - ',
      '<span class="master-name">{{name}}</span>'
    ].join(''),
    engine: Hogan,
    limit: 10
  }).on('typeahead:selected', function(event, selection){
    var symbol = selection.symbol;
    getFundamentals(symbol);
    displayChart(symbol);
  });
})(window.jQuery);

function getFundamentals(symbol) {
  // console.log(symbol);
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

  client.get("https://api.robinhood.com/fundamentals/" + symbol + "/", function(response) {
    var fundamentals = JSON.parse(response);
    // console.log("Description: " + fundamentals.description);
    // Compnay Title
      $('.bio').show();
      $('#companyName').empty();
      var companyTitle = $("<h4 class='companyTitle'>");
      var companyTitle = $("<h4>");
      companyTitle.addClass('companyTitle');
      var title = $("<h4>").text(symbol);
      
      companyTitle.append(title);
      
      $('#companyName').prepend(companyTitle);
      // #/Company Title

      // Company Info
      $('#companyInfo').empty();
      var companyPara = $("<p class='companyPara'>");
      var companyPara = $("<p>");
      companyPara.addClass("companyPara");
      var description = $("<P>").text(fundamentals.description);
      companyPara.append(description);
      $("#companyInfo").prepend(companyPara);
      // #/Company Information

      // stockDetails div
      $(".bottomPart").show();
      $('#stockDetails').empty();
      var stockOpen = $("<p class='stockOpen'>");
      var stockOpen = $("<p>");
      stockOpen.addClass("stockOpen");
      var open = $("<p>").text("fundamentals.open");
      // console.log(fundamentals.open);
      stockOpen.append("Open :  " + accounting.formatMoney(parseFloat(fundamentals.open).toFixed(2)));
      $("#stockDetails").prepend(stockOpen);

      var stockHigh = $("<p class='stockHigh'>");
      var stockHigh = $("<p>");
      stockHigh.addClass("stockHigh");
      var high = $("<p>").text(fundamentals.high);
      stockHigh.append("High : " + accounting.formatMoney(parseFloat(fundamentals.high).toFixed(2)));
      $("#stockDetails").prepend(stockHigh);

      var stockLow = $("<p class='stockLow'>");
      var stockLow  = $("<p>");
      stockLow .addClass("stockLow");
      var low = $("<p>").text(fundamentals.low);
      stockLow.append("Low : " + accounting.formatMoney(parseFloat(fundamentals.low).toFixed(2)));
      $("#stockDetails").prepend(stockLow);

      // #/stockDetails div ends

      // stockDetails2 Div starts
      $('#stockDetails2').empty();
      var market_cap = $("<p class='market_cap'>");
      var market_cap  = $("<p>");
      stockLow .addClass("market_cap");
      var cap = $("<p>").text(fundamentals.market_cap);
      market_cap.append("Market Cap :   " + accounting.formatMoney(parseFloat(fundamentals.market_cap).toFixed(2)));
      $("#stockDetails2").prepend(market_cap);


      var high_52_weeks = $("<p class='high_52_weeks'>");
      var high_52_weeks  = $("<p>");
      high_52_weeks.addClass("high_52_weeks");
      var h52Weeks= $("<p>").text(fundamentals.high_52_weeks);
      high_52_weeks.append("52 Weeks High :   " + accounting.formatMoney(parseFloat(fundamentals.high_52_weeks).toFixed(2)));
      $("#stockDetails2").prepend(high_52_weeks);

      var low_52_weeks = $("<p class='low_52_weeks'>");
      var low_52_weeks  = $("<p>");
      low_52_weeks.addClass("low_52_weeks");
      var l52Weeks= $("<p>").text(fundamentals.low_52_weeks);
      // console.log(fundamentals.l52Weeks);
      low_52_weeks.append("52 Weeks Low :  " + accounting.formatMoney(parseFloat(fundamentals.low_52_weeks).toFixed(2)));
      $("#stockDetails2").prepend(low_52_weeks);

      var pe_ratio = $("<p class='pe_ratio'>");
      var pe_ratio  = $("<p>");
      pe_ratio.addClass("pe_ratio");
      var ratio= $("<p>").text(fundamentals.pe_ratio);
      pe_ratio.append("PE Ratio :   " + fundamentals.pe_ratio);
      $("#stockDetails2").prepend(pe_ratio);

      // #/stockDetails2 Div

    // "open": "349.5100",
    // "high": "351.7500",
    // "low": "342.6700",
    // "volume": "3946915.0000",
    // "average_volume": "5974945.8127",
    // "high_52_weeks": "389.6100",
    // "dividend_yield": null,
    // "low_52_weeks": "178.1900",
    // "market_cap": "59550067400.0000",
    // "pe_ratio": null,
    // "description": "Tesla, Inc. engages in the designing, development, manufacturing and sale of electric vehicles and electric power train components. Its products include electric vehicles such as the Model S, Model X, Model 3 and the Tesla Roadster. The company also manufactures home batteries and solar roof. Tesla was founded by Jeffrey B. Straubel, Elon Reeve Musk, Martin Eberhard, and Marc Tarpenning on July 1, 2003 and is headquartered in Palo Alto, CA.",
    // "instrument": "https://api.robinhood.com/instruments/e39ed23a-7bd1-4587-b060-71988d9ef483/",
    // "ceo": "Elon Reeve Musk",
    // "headquarters_city": "Palo Alto",
    // "headquarters_state": "California",
    // "num_employees": 17782,
    // "year_founded": 2003

  });
};

// getFundamentals("IBM");
