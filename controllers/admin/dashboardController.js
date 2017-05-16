const models = require('../../models/index');

module.exports = {
    index: (req, res) => {
        models.Report.find((err, results) => {
            const vm = {
                results,
                active: { dashboard: true },
                layout: 'layouts/admin'
            };
            res.render('dashboard', vm);
        });
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