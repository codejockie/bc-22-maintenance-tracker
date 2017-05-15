const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    authId: String,
    name: String,
    email: String,
    role: String,
    created: Date
}));