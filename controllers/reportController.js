const models = require('../models/index');

module.exports = {
    index: (req, res) => {
        if (!req.user.isAdmin) {
            const assignedPersonnel = req.user.firstname;
            models.Report.find({ assignedPersonnel, approvalStatus: true })
                .count((err, approvalCount) => {
                    models.Report.find({ assignedPersonnel, rejectionStatus: true })
                        .count((err, rejectionCount) => {
                            const vm = {
                                approvalCount,
                                rejectionCount,
                                active: { request: true },
                                layout: 'layouts/staff'
                            };
                            res.render('report', vm);
                        });
                });
        } else {
            res.status(401).send('You are unauthorised to view this page.');
        }
    },
    create: (req, res) => {
        const collDate = new Date().setDate(new Date().getDate() + 14);
        const name = req.user.firstname,
            email = req.user.email,
            phone = req.user.phone;

        const newReport = new models.Report({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            problem: req.body.issue,
            type: req.body.type,
            dateCreated: req.body.startdate,
            collectionDate: collDate,
            assignedPersonnel: name,
            personnelEmail: email,
            personnelPhone: phone
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

            res.render('report', vm);
        });
    }
};