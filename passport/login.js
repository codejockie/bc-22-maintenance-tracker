const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use('login', new LocalStrategy({ passReqToCallback: true },
        (req, username, password, done) => {
        // Check in mongo if a user with username exists or not
        User.findOne({ username }, (err, user) => {
            // In case of any error, return the done method
            if (err) {
                return done(err);
            }
            // Username does not exist, log error & redirect back
            if (!user) {
                console.log('User Not Found with username', username);
                return done(null, false, req.flash('message', 'User Not Found.'));
            }
            // User exists but wrong password, log the error
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password'));
            }

            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user);
        });
    }));

    const isValidPassword = (user, password) => {
        return bCrypt.compareSync(password, user.password);
    };
};