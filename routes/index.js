const Patient = require('../models/Patient');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();
var express = require('express');
var router = express.Router();
const session = require('express-session');

var app = express();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('<a href="/auth/google"> Authenticate using google</a>');
});
const jwt = require('jsonwebtoken');
const maxAge= 3 * 24 * 60 * 60 

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role:user.role
    // Ajoutez d'autres propriétés que vous souhaitez inclure dans le token
  };
  const secret = 'my_secret_key'; // Remplacez par votre propre clé secrète
  const options = { expiresIn: '1h' }; // Définissez la durée de vie du token

  return jwt.sign(payload, secret, options);
};

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    // Retrieve user's profile information
    const { sub, name, given_name, family_name, email } = profile;

    // Check if user already exists in database
    Patient.findOne({ email: email })
      .then((user) => {
        if (user) {
          // If user already exists, return user data
          const token = generateToken(user);
          console.log(token);
          // res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
          return done(null, { user: profile, token });
        }
        else {
          return (console.log("user not found!"));
        }
      })
      .catch((err) => {
        return done(err);
      });
  }
));

// Authentication route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful authentication
router.get('/auth/google/callback',
  passport.authenticate('google'),
  function (req, res) {
    // Redirect to user's profile page after successful authentication
    res.json('Successfully logged in !');
  });



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;