import passport from 'passport';
import User from '../data/database/User';
import {Strategy as LocalStrategy} from 'passport-local';

export default function (app) {/*
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({id: id}, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(username, password);
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  app.keys = app.config.keys;*/

  app
    .use(session(app))
    .use((req, res, next) => {
      // authenticated user
      if (req.session.user) {
        req.user = req.session.user;
      }

      // Authenticate method
      req.authenticate = (username, password) => {
        return new Promise((resolve, reject) => {
          app.models.user.findOne({
            username: username
          })
          .then(user => {
            if (user.verifyPassword(password)) {
              req.session.user = req.user = user;
              resolve(user);
            } else {
              reject('bad password');
            }
          })
          .catch(err => reject(err));
        });
      };
    });
    //.use(passport.initialize())
    //.use(passport.session());
}