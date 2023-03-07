var createError = require('http-errors');
var express = require('express');
const http=require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./models/MedicalRecord");
const mongoose=require('mongoose');
require ('dotenv').config();
const medicalRecordRouter=require('./routes/medicalRecord')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var serviceRouter = require ('./routes/service');
var app = express();

//connection to db
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(()=>{console.log('connected to DB')})
.catch((err)=>{console.log(err.message)});

console.log();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/MedicalRecord', medicalRecordRouter);
app.use('/service', serviceRouter);

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


