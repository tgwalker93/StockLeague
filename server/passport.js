var passport = require('passport');
// import { Strategy as LocalStrategy} from 'passport-local';
// import bcrypt from 'bcrypt-nodejs';
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs');
var db = require('../models');

// import db from '../models'; 
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

  
//   where('username', username).first().then(user => {
//       if (!user || !bcrypt.compareSync(password, user.password)) { 
//         return done(null, false, {message: 'invalid user and password combination'});
//       }

//       done(null, user);
//     })
//     .catch(done) // pass the error back
}

const register = (req, username, password, done) => {
  // Check whether there is a user with the signup
  db.User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    console.log("I'M HERE!!!!!")
    if (user) {
      return done(null, false, { message: 'an account with that username has already been created' });
      console.log("I'M FIRST IF!!!!!")
    }
    if (password !== req.body.password) {
      console.log("I'M SECOND IF!!!!!")
      return done(null, false, { message: `passwords don't match` });
    }
    const newUser = {
      username,
      password: bcrypt.hashSync(password)
    }
    db.User.create(newUser)
    .then(function(ids) {
      newUser.id = ids[0]






      // ------ 

      db.User.update({

        stock1: "a",
        stock2: "b",
        stock3: "c",
        teamName: ""
      }, {
        where: {
          username: newUser.username
        }

      }
      ).then(function(user) {
        done(null, user);
      });



      done(null, newUser)
    });
    done(null, user);
  }).catch(done) 

  
  // db('users')
  // .where('username', username)
  //   .first()
  //   .then(user => {
  //     if (user) {
  //       return done(null, false, { message: 'an account with that username has already been created' });
  //     }
  //     if (password !== req.body.password2) {
  //       return done(null, false, { message: `passwords don't match` });
  //     }
  //     const newUser = {
  //       first_name: req.body.first_name,
  //       last_name: req.body.last_name,
  //       username,
  //       password: bcrypt.hashSync(password)
  //     }
  //     db('users')
  //       .insert(newUser)
  //       .then(ids => {
  //         newUser.id = ids[0]
  //         done(null, newUser)
  //       })
  //   })
}


passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));

// Choose what to send as a cookie to the client side
passport.serializeUser((user, done) => {
  console.log("I'M SERIAL");
  done(null, user.id);
});

// Get the entire user information from the database based on the user id
passport.deserializeUser((id, done) => {
  db.User.findAll({}).then(function(user) {
    done(null, user)
  }).catch(done);
  // db('users')
  //   .where('id', id)
  //   .first()
  //   .then(user => {
  //     done(null, user)
  //   })
  //   .catch(done) // pass the error back
});
}
// module.exports = passport;