const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

accountSchema.pre('save', (next) => {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 12, (err, hash) => {
        if (err) {
            next(err);
            return;
        }
        user.password = hash;
        next();
    });
});

// Define a method to verify password validity
accountSchema.methods.isValidPassword = (password, callback) => {
    bcrypt.compare(password, this.password, (err, isValid) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

module.exports = accountSchema;