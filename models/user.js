const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    firstname: String,
    lastname: String
});

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
    const query = { username };
    User.findOne(query, callback);
};

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        callback(null, isMatch);
    });
};

module.exports.createUser = (user, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            user.save(callback);
        });
    });
};