const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String,
    email: String,
    isAdmin: {
        type: String,
        default: false
    },
    firstname: String,
    lastname: String
}));