var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs');
var db = require('../models');
var logic = require("./serverSideLogic");

var saveUser = {

}

module.exports = function(passport) {

const authenticate = (username, password, done) => {
  db.User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    if (!user || !bcrypt.compareSync(password, user.password)) { 
      return done(null, false, {message: 'invalid user and password combination'});
    }
    updateLogin(username);
    done(null, user);
  }).catch(done) 



}
function updateLogin(username){
  db.User.update({
    lastLogin: logic.getCurrentDate()
  },{
    where: {
      username: username
    }
  }).then(function(user) {
    console.log("Last Login date has been updated");

  });
}


const register = (req, username, password, done) => {
  // Check whether there is a user with the signup
  db.User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    saveUser = {
      username: req.body.username,
      password: req.body.password,
      stock1: req.body.stock1,
      stock2: req.body.stock2,
      stock3: req.body.stock3,
      teamName: req.body.teamName
    }
    if (user) {
      return done(null, false, { message: 'an account with that username has already been created' });
    }
    if (password !== req.body.password) {
      return done(null, false, { message: `passwords don't match` });
    }
    const newUser = {
      username,
      password: bcrypt.hashSync(password)
    }
    db.User.create(newUser).then(function(ids) {
      newUser.id = ids.dataValues.id;
      updateStocks(saveUser);
      done(null, newUser)
      
    })

  }).catch(done)

}

passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));


function updateStocks(saveUser) {
  var currentDate = logic.getCurrentDate();
  db.User.update({
            stock1: saveUser.stock1,
            stock1Date: currentDate,
            stock2: saveUser.stock2,
            stock2Date: currentDate,
            stock3: saveUser.stock3,
            stock3Date: currentDate,
            teamName: saveUser.teamName,
            profilePoints: 0,
            lastLogin: currentDate
          }, {
            where: {
              username: saveUser.username
            }
          }).done()

}

// Choose what to send as a cookie to the client side
passport.serializeUser((user, done) => {
  done(null, user.id);
  
});

// Get the entire user information from the database based on the user id
passport.deserializeUser((id, done) => {
  db.User.findAll({}).then(function(user) {
    done(null, user)
  }).catch(done);
});

}

