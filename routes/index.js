const User = require('../models/User');
const Patient=require('../models/Patient');
const MedicalRecord=require('../models/MedicalRecord');
const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require ('dotenv').config();
var express=require('express');
var router = express.Router();
const session = require('express-session');

var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<a href="/auth/google"> Authenticate using google</a>');
});

passport.use(new GoogleStrategy({
  clientID:process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
  // Retrieve user's profile information
  const { sub, name, given_name, family_name, email } = profile;
  
  // Check if user already exists in database
  Patient.findOne({ email: email })
  .then((user) => {
    if (user) {
      // If user already exists, return user data
      return done(null, user);
    } else {
      // If user does not exist, create new user and save to database
      const newPatient = new Patient({
        firstName: given_name,
        lastName: family_name,
        email: email,
        role: 'patient',
        confirmed: true,
      });
      newPatient.save()
        .then(() => {
          return done(null, newPatient);
        })
        .catch((err) => {
          return done(err);
        });
        MedicalRecord.create({
          email: newPatient.email,
          dateOfBirth: newPatient.dateOfBirth,
          Patient: newPatient._id,
      });
      newPatient.findByIdAndUpdate(newPatient._id,
        {
            $set: { MedicalRecord: MedicalRecord._id},
        },
        { new: true }
    );
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
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Redirect to user's profile page after successful authentication
  res.redirect('/profile');
});

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;