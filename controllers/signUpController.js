const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');
const express=require('express');
const User = require('../models/User');
const emailValidator = require('email-validator');
require ('dotenv').config();
const nodemailer=require('nodemailer');
const _ = require('lodash');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Define a secret key for JWT
const secretKey = 'mysecretkey';
const EMAIL_SECRET='mysecretemail';

//creating transporter (the sender of the email verification)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

// signup
const signUpFunction=async(req, res) => {
  let { userName,firstName,lastName,gender,address,phoneNumber, email, password, dateOfBirth,role,confirmPassword,code,phoneNotVerif} = req.body;
  userName = userName.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();
  gender = gender.trim();
  address = address.trim();
  phoneNumber = phoneNumber.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();
  role = role.trim();
  confirmPassword = confirmPassword.trim();
  code=code.trim(); 
  phoneNotVerif=phoneNotVerif.trim();
  if (userName == '' || firstName == '' || lastName == '' || gender == '' || address == '' ||  email == '' || password == '' || dateOfBirth == '' || role=='' || confirmPassword=='') {
    res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    });
  } else if (password.length < 8) {
    res.json({
      status: 'FAILED',
      message: 'Invalid password entered!',
    });
  } else if(!emailValidator.validate(email)){
    res.json({
        status: 'FAILED',
        message: 'Invalid email entered!',
    })
  } else if(confirmPassword!=password){
    res.json({
        status: 'FAILED',
        message: 'Wrong password confirmation!'
    })
  }
  else {
    //test sur le role
    if(role=='patient'){
    // checking if the user exists
    console.log('Before User.find()');
    await User.find({ email })
      .then((result) => {
        console.log('After User.find()');
        if (result.length) {
          res.json({
            status: 'FAILED',
            message: 'User already exists!',
          });
        } else {
          // save User
          // Generate JWT token
          const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPasswords) => {
              
              const newPatient = new Patient({
                userName,
                firstName,
                lastName,
                gender,
                address,
                phoneNumber,
                email,
                password: hashedPasswords,
                dateOfBirth,
                confirmed:false,
                code,
                phoneNotVerif,
              });

              //sending email verification with jwt before saving user
            //   jwt.sign(
            //     {
            //       user: _.pick(newPatient, 'id'),
            //     },
            //     EMAIL_SECRET,
            //     {
            //       expiresIn: '1d',
            //     },
            //     (err, emailToken) => {
            //       const url = `http://localhost:5000/confirmation/${emailToken}`;
          
            //       transporter.sendMail({
            //         to: newPatient.email,
            //         subject: 'Confirm Email',
            //         html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
            //       });
            //     },
            //   );



                // Generate email verification token
                try {
                    var emailToken = jwt.sign(
                        {
                          user: _.pick(newPatient, 'id'),
                        },
                        EMAIL_SECRET,
                        {
                          expiresIn: '1d',
                        }
                      );
                } catch (error) {
                    res.json(error.message);
                }

      // Construct email verification URL
    const url = `http://localhost:5000/signup/${emailToken}`;

    // Send email verification link to patient
    transporter.sendMail({
      to: email,
      subject: 'Confirm Email',
      html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
    });
   
              newPatient
                .save()
                .then((result) => {
                  res.json({
                    status: 'SUCCESS',
                    message: 'SignUp successful',
                    data: result,
                    token,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: 'FAILED',
                    message: 'An error occurred while saving user account' + err.message,
                  });
                });
        })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occurred while hashing password!',
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 'failed',
          message: 'An error occurred while checking for existing user!',
        });
      });
    }
    else if(role=='doctor'){
        await User.find({ email })
      .then((result) => {
        console.log('After User.find()');
        if (result.length) {
          res.json({
            status: 'FAILED',
            message: 'User already exists!',
          });
        } else {
          // save User
          // Generate JWT token
          const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPasswords) => {
              const newDoctor = new Doctor({
                userName,
                firstName,
                lastName,
                gender,
                address,
                phoneNumber,
                email,
                password: hashedPasswords,
                dateOfBirth,
                confirmed:false,
                IsValidated:false,
              });

              //email verification
               // Generate email verification token
               try {
                var emailToken = jwt.sign(
                    {
                      user: _.pick(newDoctor, 'id'),
                    },
                    EMAIL_SECRET,
                    {
                      expiresIn: '1d',
                    }
                  );
            } catch (error) {
                res.json(error.message);
            }

  // Construct email verification URL
const url = `http://localhost:5000/signup/${emailToken}`;

// Send email verification link to patient
transporter.sendMail({
  to: email,
  subject: 'Confirm Email',
  html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
});
              
              newDoctor
                .save()
                .then((result) => {
                  res.json({
                    status: 'SUCCESS',
                    message: 'SignUp successful',
                    data: result,
                    token,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: 'FAILED',
                    message: 'An error occurred while saving user account' + err.message,
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occurred while hashing password!',
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 'failed',
          message: 'An error occurred while checking for existing user!',
        });
      });
    }
  }
};
module.exports={signUpFunction};