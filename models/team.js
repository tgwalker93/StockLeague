// module.exports = burgers;
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");


module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    username: DataTypes.STRING,
    teamName: DataTypes.STRING,
    stock1: DataTypes.STRING,
    stock1value: DataTypes.INTEGER,
    stock2: DataTypes.STRING,
    stock2value: DataTypes.INTEGER,
    stock3: DataTypes.STRING,
    stock3value: DataTypes.INTEGER,
    stockaggregate: DataTypes.INTEGER
  });
  return Team;
};
