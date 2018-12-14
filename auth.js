const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;

const config = require('./config/app.config');
const User = require('./models/user.model');

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = () => {
  const strategy = new Strategy(params, (payload, done) => {
    User.find({ email: payload.user.email }, (err, user) => {
      if (!user) {
        return done(new Error('user not found'), null);
      } else {
        delete user.password;

        return done(null, {
          id: user.id,
          role: user.role
        });
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', config.jwtSession);
    }
  };
};