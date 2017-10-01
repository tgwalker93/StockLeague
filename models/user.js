// module.exports = burgers;
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    stockInventory: DataTypes.INTEGER,
    stock1: DataTypes.STRING,
    stock2: DataTypes.STRING,
    stock3: DataTypes.STRING,
    teamName: DataTypes.STRING
  });
  return User;
};