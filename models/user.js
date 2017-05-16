const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', new Schema({
    authId: String,
    name: String,
    email: String,
    role: String,
    created: Date
}));