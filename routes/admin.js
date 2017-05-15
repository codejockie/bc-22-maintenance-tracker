const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('admin', {pageTitle: 'Admin Page'});
    });


module.exports = router;