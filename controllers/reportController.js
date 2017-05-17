const models = require('../models/index');

module.exports = {
    index: (req, res) => {
        if (!req.user.isAdmin) {
            res.render('newreport');
        } else {
            res.status(401).send('You are unauthorised to view this page.');
        }
    },
    create: (req, res) => {
        const collDate = new Date().setDate(new Date().getDate() + 14);

        const newReport = new models.Report({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            problem: req.body.issue,
            type: req.body.type,
            dateCreated: req.body.startdate,
            collectionDate: collDate
        });

        newReport.save((err, report) => {
            const vm = {
                msg: 'Report request successfully created.',
                class: 'success'
            };

            if (err) {
                vm.msg = 'An error occured.';
                vm.class = 'danger';
            }

            res.render('newreport', vm);
        });
    }
};