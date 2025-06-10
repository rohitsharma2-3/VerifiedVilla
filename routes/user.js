const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const passport = require('passport')
const { saveRedirectUrl } = require('../utils/isLogedIn')
const userController = require('../controllers/userController')


router.get('/signup', (userController.signUpForm))

router.post('/signup', wrapAsync(userController.signUpPage))

router.get('/login', (userController.loginForm))

router.post('/login', saveRedirectUrl, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (userController.loginPage));


router.get('/logout', (userController.logOutPage))


module.exports = router