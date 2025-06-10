const User = require('../models/user');


const signUpForm = (req, res) => {
    res.render('user/user.ejs')
}

const signUpPage = async (req, res) => {
    try {
        let { username, email, password } = req.body
        let newUser = new User({
            username,
            email
        })
        const regUser = await User.register(newUser, password);
        req.login(regUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash('success', 'Sign-Up Successfully')
            res.redirect(res.locals.redirectUrl || '/VerifiedVilla')
        })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/signup')
    }
}

const loginForm = (req, res) => {
    res.render('user/login.ejs')
}

const loginPage = (req, res) => {
    req.flash('success', 'Login Successfully.')
    const redirectUrl = res.locals.redirectUrl || '/VerifiedVilla';
    res.redirect(redirectUrl);
}

const logOutPage = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash('success', 'you are logout')
        res.redirect('/VerifiedVilla')
    })
}


module.exports = { signUpForm, signUpPage, loginPage, loginForm, logOutPage }