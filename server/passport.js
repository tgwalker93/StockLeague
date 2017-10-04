import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

import db from '../models'; 

const authenticate = (username, password, done) => {
  db('user')
    .where('username', username)
    .first()
    .then(user => {
      if (!user || !bcrypt.compareSync(password, user.password)) { 
        return done(null, false, {message: 'invalid user and password combination'});
      }

      done(null, user);
    })
    .catch(done) // pass the error back
}

const register = (req, username, password, done) => {
  // Check whether there is a user with the signup
  db('users')
    .where('username', username)
    .first()
    .then(user => {
      if (user) {
        return done(null, false, { message: 'an account with that username has already been created' });
      }
      if (password !== req.body.password2) {
        return done(null, false, { message: `passwords don't match` });
      }
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username,
        password: bcrypt.hashSync(password)
      }
      db('users')
        .insert(newUser)
        .then(ids => {
          newUser.id = ids[0]
          done(null, newUser)
        })
    })
}


passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));

// Choose what to send as a cookie to the client side
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Get the entire user information from the database based on the user id
passport.deserializeUser((id, done) => {
  db('users')
    .where('id', id)
    .first()
    .then(user => {
      done(null, user)
    })
    .catch(done) // pass the error back
});