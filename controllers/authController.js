const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const models = require('../models/index');

module.exports = {
    index: (req, res) => {
        res.render('login', { message: req.flash('message') });
    },
    login: (req, res) => {
        console.log(req.user);
        req.flash('success', 'You are now logged in');

        if (req.user.isAdmin) {
            return res.redirect('/admin/dashboard');
        }
        res.redirect('/newreport');
    },
    logout: (req, res) => {
        req.logout();
        req.flash('success', 'You are now logged out');
        res.redirect('/login');
    },
    register: (req, res) => {
        req.checkBody('firstName').notEmpty();
        // TODO: Add other checks

        const errors = req.validationErrors();

        if (errors) {
            // TODO: handle errors
        } else {
            // create the user instance and assign the values from the body

            req.flash('success', 'Registration was successful');
        }
    },
    signup: (req, res) => {
        res.render('register', { message: req.flash('message') });
    }
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    models.User.getUserById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    models.User.getUserByUsername(username, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Unknown user' });
        }

        models.User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }
        });
    });
}));