import passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';


export default function (app) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    app.models.user.findOne({id}, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy((username, password, done) => {
    // find user
    app.models.user.findOne({ username }, (err, user) => {
      // can't find or verify user
      if (err || !user || !user.verifyPassword(password)) {
        return done(err, false);
      }

      // verified user
      return done(null, user);
    });
  }));

  app
    .use(passport.initialize())
    .use(passport.session());
}