// module.exports = burgers;
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");


module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    teamName: DataTypes.STRING,
    member1: DataTypes.STRING,
    member2: DataTypes.STRING,
    member3: DataTypes.STRING,
    member4: DataTypes.STRING,
    member5: DataTypes.STRING,
    teamPoints: DataTypes.INTEGER
  });
  return Team;
};