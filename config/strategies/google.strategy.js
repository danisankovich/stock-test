var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userSchema');


module.exports = function(app) {
  passport.use(new GoogleStrategy({
    clientID: '337996401264-sajn0u8ofte6cc19emtdnmape852njif.apps.googleusercontent.com',
    clientSecret: 'bUgPXaCgFqyFpRVA_eTiXUW8',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({ email: profile.emails[0].value }, function(err, user){
        if (!user) {
          User.create({
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
          }, function(err, newUser){
            done(null, newUser);
          });
        } else {
          done(null, user);
        }
      });
    }
  ));
};
