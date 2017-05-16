const Case = require('../../models/Case');

module.exports = {
    index: (req, res) => {
        // TODO: Retrieve all the maintenance/repair requests from Db
        res.render('admin');
    }
};