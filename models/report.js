const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

module.exports = mongoose.model('Report', new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    collectionDate: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    comments: {
        type: Array
    }
}));