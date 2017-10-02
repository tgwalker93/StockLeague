// module.exports = burgers;
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");


module.exports = function(sequelize, DataTypes) {
  var Stock = sequelize.define("Stock", {
    name: DataTypes.STRING
  });
  return Stock;
};