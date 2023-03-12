var express = require('express');
var router = express.Router();
const {login_get}=require('../controllers/authController');
const {login_post}=require('../controllers/authController');
const {logout_get}=require('../controllers/authController');
const {forget_password}=require('../controllers/authController');
const {reset_password}=require('../controllers/authController');
const {loginAdmin_post}=require('../controllers/authController');
const {loginAdmin_get}=require('../controllers/authController');
const {logoutAdmin_get}=require('../controllers/authController');



router.get('/login',login_get);
router.post('/login',login_post);
router.get('/logout',logout_get);
router.post('/forget-password',forget_password);
router.post('/reset-password',reset_password);
router.get('/loginAdmin',loginAdmin_get);
router.post('/loginAdmin',loginAdmin_post);
router.get('/logoutAdmin',logoutAdmin_get);

module.exports = router;