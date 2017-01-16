var passport=require('passport');
// for basic http;
var LocalStrategy=require('passport-local').Strategy;
var googleStrategy    = require('passport-google-oauth2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var models= require('./v1/models');
var jwt= require('jsonwebtoken');
var config= require('./config/config.json');
var bcrypt=require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField:"email",
    passwordField:"password"
  },
  function(username, password, done) {
    models.User.findOne({where:{email:username}}).then(function(user){
      if(user){
        // console.log(user.email);
        if(bcrypt.compareSync(password,user.password)){
          var token = jwt.sign(user.toJSON(), config.supersecret, {
            expiresIn : 60*60*24
          });
          // remove password
          models.User.findOne({where:{email:username},attributes: {
              exclude: ['password']
          }}).then(function(user){
            console.log("testing");
            return done(null, user,{token:token});
          });

        }
        else{
          console.log("error password invalid");
          return done(null, false);
        }
      }
      else{
        return done(null, false);
        console.log("email invalid ");
      }
    });
  }
));
// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : config.facebookAuth.clientID,
    clientSecret    : config.facebookAuth.clientSecret,

},
// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {
      models.User.findOne({where:{fb_id:profile.id}}).then(function(user){

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)  return done(err);

            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {

                // if there is no user found with that facebook id, create them
                var newUser={};

                // set all of the facebook information in our user model
                newUser.fb_id    = profile.id; // set the users facebook id
                newUser.fb_token = token; // we will save the token that facebook provides to the user
                newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                // save our user to the database
                models.User.create(newUser).then(function(user) {
                  callback(null,"done");
                });
            }

        });
    });

}));
