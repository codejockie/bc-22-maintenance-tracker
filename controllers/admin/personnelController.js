const models = require('../../models/index');

module.exports = {
    index: (req, res) => {
        if (req.user.isAdmin) {
            models.Personnel.find((err, results) => {
                const vm = {
                    results,
                    active: { personnel: true },
                    layout: 'layouts/admin'
                };
                res.render('personnel', vm);
            });
        } else {
            res.status(401).send('Unauthorised to view this page. Login as an admin to continue');
        }
    },
    'new': (req, res) => {
        const vm = {
            active: { newpersonnel: true },
            layout: 'layouts/admin'
        };
        res.render('add', vm);
    },
    create: (req, res) => {
        const newPersonnel = new models.Personnel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone
        });

        newPersonnel.save((err, report) => {
            const vm = {
                msg: 'Personnel successfully added.',
                class: 'success',
                active: { personnel: true },
                layout: 'layouts/admin'
            };

            if (err) {
                vm.msg = 'An error occured.';
                vm.class = 'danger';
            }
            res.render('add', vm);
        });
    }
};