const User = require('../models/User');
const usersCtrl = {};
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/sign-up');
}

usersCtrl.signUp = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(password != confirm_password) {
        errors.push({text: 'Passwords do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Passwords must be at least 4 characters'});
    }
    if(errors.length > 0){
        res.render('users/sign-up', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    }else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/sign-up');
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/log-in');
        }
    }
}

usersCtrl.renderLogInForm = (req, res) => {
    res.render('users/log-in');
}

usersCtrl.logIn = passport.authenticate('local', {
    failureRedirect: '/users/log-in',
    successRedirect: '/notes',
    failureFlash: true
});

usersCtrl.logOut = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/log-in');
}

module.exports = usersCtrl;