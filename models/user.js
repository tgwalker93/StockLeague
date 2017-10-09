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
    stock1Date: DataTypes.DATEONLY,
    stock2: DataTypes.STRING,
    stock2Date: DataTypes.DATEONLY,
    stock3: DataTypes.STRING,
    stock3Date: DataTypes.DATEONLY,
    teamName: DataTypes.STRING,
    profilePoints: DataTypes.INTEGER,
    lastLogin: DataTypes.DATEONLY
  });
  return User;
};