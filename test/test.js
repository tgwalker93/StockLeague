"use strict";

console.log("I'm here!")

before(() => {
    $ = require('jquery');
    global.$ = $;
  });
var expect = require("chai").expect;


function testAjax() {

    $.ajax({
        url: "https://www.alphavantage.co/query?function=WMA&symbol=MSFT&interval=15min&time_period=10&series_type=close&apikey=demo",
        method: "GET"
      }).done(function(response) {
        console.log(response);
        return true
          });

}



describe("testAjax", function() {
    it("to make api call", function() {
      expect(testAjax()).to.equal(true);
    });
  });
  


