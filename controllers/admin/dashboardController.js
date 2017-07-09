const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

const Report = require('../../models/report');

module.exports = {
    index: (req, res) => {
        if (req.user.isAdmin) {
            const currentDate = new Date().toISOString();
            Report.find((err, results) => {
                Report.find({ collectionDate: { $lt: currentDate } })
                    .count((err, count) => {
                        const vm = {
                            results,
                            count,
                            active: { dashboard: true },
                            layout: 'layouts/admin'
                        };
                        res.render('dashboard', vm);
                    });
            });
        } else {
            res.status(401).send('Unauthorised to view this page. Login as an admin to continue');
        }

    },
    resolve: (req, res) => {
        const id = req.body.id || req.query.id;
        if (id) {
            Report.findOneAndUpdate({ _id: id }, { resolveStatus: true }, (err, result) => {
                const vm = {
                    msg: 'Update was successful',
                    class: 'success'
                };
                if (err) {
                    vm.msg = 'An error occured';
                    vm.class = 'danger';
                }

                res.render('dashboard', vm);
            });
        }
    },
    approve: (req, res) => {
        const _id = req.body.approverequest;
        if (_id) {
            findAndUpdate(_id, { approvalStatus: true }, (err, result) => {
                if (err) {
                    res.flash(error.type, error.message);
                    return res.redirect(301, '/admin/dashboard');
                }
                Report.findById(_id, (err, doc) => {
                    const toNumber = `234${doc.personnelPhone.substring(1)}`;
                    sendSms(toNumber, `Your request has been approved.`);
                });
                res.flash(success.type, success.message);
                res.redirect(301, '/admin/dashboard');
            });
        }
    },
    reject: (req, res) => {
        const _id = req.body.rejectrequest,
            comment = req.body.comment;

        if (_id && comment) {
            findAndUpdate(_id, { rejectionStatus: true }, (err, result) => {
                if (err) {
                    res.flash(error.type, error.message);
                    return res.redirect(301, '/admin/dashboard');
                }
                addComment(_id,
                    { $push: { comments: comment } },
                    { safe: true, upsert: true },
                    (err, result) => {
                        if (err) {
                            res.flash(error.type, error.message);
                            return res.redirect(301, '/admin/dashboard');
                        }

                        Report.findById(_id, (err, doc) => {
                            const toNumber = `234${doc.personnelPhone.substring(1)}`;
                            sendSms(toNumber, `Your request has been rejected.`);
                        });
                        res.flash(success.type, success.message);
                        res.redirect(301, '/admin/dashboard');
                    });
            });
        }
    }
};

const findAndUpdate = (id, update, callback) => {
    Report.findByIdAndUpdate(id, update, callback);
};
const error = {
    type: 'error',
    message: 'An error occured, could not complete request'
};
const success = {
    type: 'success',
    message: 'Request success. SMS notification was sent.'
};

const addComment = (id, update, options, callback) => {
    Report.findByIdAndUpdate(id, update, options, callback);
};

const sendSms = (toNumber, messageBody) => {
    nexmo.message.sendSms(
        'mTracker', toNumber, messageBody, { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        }
    );
};