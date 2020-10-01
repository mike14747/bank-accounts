const router = require('express').Router();
const passport = require('../passport/passportFunctions');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

router.get('/logout', (req, res) => {
    req.logOut();
    if (req.isAuthenticated()) {
        res.status(500).json({ message: 'Logout was unsuccessful', user: req.user });
    } else {
        res.status(200).json({ message: 'User has been logged out', user: null });
    }
});

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(299).json({ error: 'User is not logged in!' });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(299).json(info);
        req.logIn(user, function (error) {
            if (error) return next(error);
        });
        return res.status(200).json({ user: user, message: 'successful login' });
    })(req, res, next);
});

router.post('/register', async (req, res) => {
    // input validation is needed here for the username and password
    if (req.body.username.length < 6 || req.body.password.length < 6) {
        res.redirect('/register');
    } else {
        const saltRounds = 10;
        try {
            const [data, error] = await User.getUserByUsernameForRegister({ username: req.body.username });
            if (error) {
                console.log(error);
                res.redirect('/register');
            }
            if (data && data.length === 0) {
                bcryptjs.hash(req.body.password, saltRounds, async function (err, hash) {
                    if (err) throw err;
                    const [result, userError] = await User.addNewUser({ username: req.body.username, password: hash });
                    if (result && result.insertId) {
                        // res.redirect('/login');
                        // or to have a newly registered user auto login
                        passport.authenticate('login')(req, res, () => {
                            res.redirect('/');
                        });
                    } else {
                        // the registration info wasn't added to the database
                        console.log(userError);
                        res.redirect('/register');
                    }
                });
            } else {
                // that username is already taken
                res.redirect('/register');
            }
        } catch (error) {
            console.log(error);
            res.redirect('/register');
        }
    }
});

module.exports = router;
