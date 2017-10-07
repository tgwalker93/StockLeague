var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs');
var db = require('../models');

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

    done(null, user);
  }).catch(done) 



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
      stock3: req.body.stock3
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

  })

}

passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));

function updateStocks(saveUser) {
  db.User.update({
            stock1: saveUser.stock1,
            stock2: saveUser.stock2,
            stock3: saveUser.stock3,
            teamName: ""
          }, {
            where: {
              username: saveUser.username
            }
          }).then(function(user) {
            console.log("Stocks inserted into database")
            console.log(user);
          })
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

