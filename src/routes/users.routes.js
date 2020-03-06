const { Router } = require('express');
const router = Router();

const {
    renderLogInForm,
    renderSignUpForm,
    logIn,
    signUp,
    logOut
} = require('../controllers/users.controller');

router.get('/users/sign-up', renderSignUpForm);

router.post('/users/sign-up', signUp);

router.get('/users/log-in', renderLogInForm);

router.post('/users/log-in', logIn);

router.get('/users/log-out', logOut);

module.exports = router;