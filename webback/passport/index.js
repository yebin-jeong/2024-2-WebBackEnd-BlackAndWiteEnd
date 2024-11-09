const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [ {
        model: Restaurant,
        attributes: ['id', 'name'],
        as: 'Followings',
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};