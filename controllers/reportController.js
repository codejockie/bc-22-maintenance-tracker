const report = require('../models/Case');

module.exports = {
    index: (req, res) => {
        res.render('newreport');
    },
    create: (req, res) => {
        // TODO: Send form data to DB
    }
};