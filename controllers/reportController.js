const models = require('../models/index');

module.exports = {
    index: (req, res) => {
        res.render('newreport');
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
            collectionDate: collDate,
            status: 'unresolved'
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