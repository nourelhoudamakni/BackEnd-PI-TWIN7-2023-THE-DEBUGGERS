const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const HospitalService = require('../models/HospitalService');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/User');
const emailValidator = require('email-validator');
require('dotenv').config();
const nodemailer = require('nodemailer');
const _ = require('lodash');
const MedicalRecord = require('../models/MedicalRecord');
const speakeasy=require('speakeasy');


//let the pc access less secured websites
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Define a secret key for JWT
const secretKey = 'mysecretkey';
const EMAIL_SECRET = 'mysecretemail';

//creating transporter (the sender of the email verification)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// signup
const signUpFunction = async (req, res) => {
    let { userName, firstName, lastName, gender, address, phoneNumber, email, password, dateOfBirth, role, confirmPassword,code,phoneNotVerif,enableTwoFactorAuth } = req.body;
    userName = userName.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    gender = gender.trim();
    address = address.trim();

    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    role = role.trim();
    confirmPassword = confirmPassword.trim();




    if (userName == '' || firstName == '' || lastName == '' || gender == '' || address == '' || email == '' || password == '' || dateOfBirth == '' || role == '' || confirmPassword == '') {
        res.json({
            status: 'FAILED',
            message: 'Empty input fields!',
        });
    } else if (password.length < 8) {
        res.json({
            status: 'FAILED',
            message: 'Invalid password entered!',
        });
    } else if (!emailValidator.validate(email)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid email entered!',
        })
    } else if (confirmPassword != password) {
        res.json({
            status: 'FAILED',
            message: 'Wrong password confirmation!'
        })
    }
    else {
        let secret1 = '';
        if (enableTwoFactorAuth) {
            secret1 = speakeasy.generateSecret({ length: 20 }).base32;
        };
        //test sur le role
        if (role == 'patient') {
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
                        
                        // password handling
                        const saltRounds = 10;
                        bcrypt
                            .hash(password, saltRounds)
                            .then((hashedPasswords) => {
                                var newPatient = new Patient({
                                    userName,
                                    firstName,
                                    lastName,
                                    gender,
                                    address,
                                    phoneNumber,
                                    email,
                                    password: hashedPasswords,
                                    dateOfBirth: new Date(dateOfBirth),
                                    confirmed: false,
                                    role:'patient',
                                    code,
                                    phoneNotVerif,
                                    secret:secret1,
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
                                            user: _.pick(newPatient, 'id','role'),
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
                                            emailToken,
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
        else if (role == 'doctor') {
            // const {idServ}=req.params;
            // if(!idServ){
            //     return(res.json({
            //         status: 'FAILED',
            //         message: 'You forgot to insert the service id! ',
            //     }));
            // };
            // const service= await HospitalService.findById(idServ);
            // // if(!service){
            // //     res.json({
            // //         status: 'FAILED',
            // //         message: 'invalid service id! ',
            // //     });
            // // }
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
                        // password handling
                        const saltRounds = 12;
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
                                    confirmed: false,
                                    IsValidated: false,
                                    role:'doctor',
                                    // Service:service._id,
                                    code,
                                    phoneNotVerif,
                                });

                                //email verification
                                // Generate email verification token
                                try {
                                    var emailToken = jwt.sign(
                                        {
                                            user: _.pick(newDoctor, 'id','role'),
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
                                            emailToken,
                                            
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
module.exports = { signUpFunction };