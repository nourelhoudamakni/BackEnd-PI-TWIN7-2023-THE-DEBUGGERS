var createError = require('http-errors');
var express = require('express');
const http=require('http');
var cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
var logger = require('morgan');
const mongoose=require('mongoose');
var authRoutes = require('./routes/authRoutes');
const { requireAuth } = require('./middlewares/authMiddleware');
require ('dotenv').config();
const patient =require('./models/Patient');
var medicalRecordRouter=require('./routes/medicalRecord');
var patientRouter=require('./routes/patientRouter');
var doctorRouter=require('./routes/doctorRouter');
const signUpRouter=require('./routes/signUp');
var HospitalRouter=require('./routes/Hospital');
var serviceRouter = require('./routes/service');
var adminRouter = require('./routes/adminDash');
var prescritionRouter=require('./routes/prescription')
var indexRouter=require('./routes/index');
var appointmentRouter=require('./routes/AppointmentRoute');
const session = require('express-session');
const cors = require('cors');


var app = express();



app.use(cors());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

//connection to db
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(()=>{console.log('connected to DB')})
.catch((err)=>{console.log(err.message)});

console.log()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');



// app.get('/', (req, res) => res.send('Home Page'));
app.get('/doctor', requireAuth, (req, res) => {
  if (req.userRole !== 'doctor') {
    res.send('Home Page');
  } else {
    res.send('Doctor Space');
  }
});
app.get('/patient', requireAuth, (req, res) => {
  if (req.userRole !== 'patient') {
    res.send('Home Page');
  } else {
    res.send('Patient Space');
  }
});

/////les paths des routes 
app.use('/',indexRouter)
app.use(authRoutes);  //pour appellé les methode dans authRoutes
app.use('/signup',signUpRouter);
app.use('/MedicalRecord', medicalRecordRouter);
app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use('/hospital',HospitalRouter);
app.use('/service', serviceRouter);
app.use('/admin', adminRouter );
app.use('/appointment',appointmentRouter);
app.use('/prescription',prescritionRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

//creation du serveur
const server=http.createServer(app);
server.listen(5000,()=>{
  console.log("app is running on port 5000");
})








