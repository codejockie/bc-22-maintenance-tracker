const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = {
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                res.flash('error', 'An error occured, kindly try again');
                return res.redirect(301, '/');
            }
            if (!user) {
                res.flash('error', 'Username or Password incorrect.');
                return res.redirect(301, '/');
            }
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                if (req.user.isAdmin) {
                    return res.redirect('/admin/dashboard');
                }
                res.redirect('/report');
            });
        })(req, res, next);

    },
    logout: (req, res) => {
        req.logout();
        res.flash('success', 'You are now logged out');
        res.redirect('/');
    },
    register: (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const phone = req.body.phone;
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        // Validations
        req.checkBody('firstname', 'Firstname field is required').notEmpty();
        req.checkBody('lastname', 'Lastname field is required').notEmpty();
        req.checkBody('email', 'Email field is required').notEmpty();
        req.checkBody('email', 'You must use a valid email').isEmail();
        req.checkBody('phone', 'Phone number is required').notEmpty();
        req.checkBody('password', 'Password field is required').notEmpty();
        req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

        const errors = req.validationErrors();

        if (errors) {
            return res.render('register', {
                errors
            });
        } else {
            const newUser = new models.User({
                firstname,
                lastname,
                phone,
                username,
                email,
                password
            });

            User.createUser(newUser, (err, user) => {
                if (err) {
                    res.flash('error', 'An error occured. Kindly try again.');
                    return res.redirect(301, '/signup');
                }
                res.flash('success', 'Registration was successful.\nYou can now log in');
                res.redirect(302, '/');
            });
        }
    },
    signup: (req, res) => {
        const vm = {
            active: { signup: true }
        };
        res.render('register', vm);
    }
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }
        });
    });
}));