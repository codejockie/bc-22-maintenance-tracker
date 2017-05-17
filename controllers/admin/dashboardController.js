const models = require('../../models/index');

module.exports = {
    index: (req, res) => {
        if (req.user.isAdmin) {
            const currentDate = new Date().toISOString();
            models.Report.find((err, results) => {
                models.Report.find({ collectionDate: { $lt: currentDate } }).count((err, count) => {
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
            models.Report.findOneAndUpdate({ _id: id }, { status: true }, (err, result) => {
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

    },
    reject: (req, res) => {

    }
};