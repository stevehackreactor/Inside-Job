const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  // creates the cookie


  console.log('serializeUser', user);
  // done(null, user.id);
  done(null, user.id);

});

passport.deserializeUser(function(user, done) {
  // parses the cookie

  // id is actually the user profile, change back after testing
  done(null, user);

  // User.findById(id, function(err, user) {
  //   // do stuff in the db
  //   done(err, user);
  // });
});

passport.use(new GoogleStrategy({
  clientID: '72049321950-t0dcl714jtn83ste38331gk9mh7e9kja.apps.googleusercontent.com',
  clientSecret: 'nfhS-I1U0UuG_mFjlkuRXlYR',
  callbackURL: "http://localhost:3003/auth/google/callback" // redirct location when the user signs in
},
function(accessToken, refreshToken, profile, done) {
  // use the profile info, mainly the id, to check if the user is registered in our db
  // if user doesn't exist, create them in the database using a combination of the info from
  // their profile object sent by google and info that they enter in the sign up process
  // if they do exist, redirect them to their profile page.
  console.dir(profile);

  return done(null, profile);
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
}
));
