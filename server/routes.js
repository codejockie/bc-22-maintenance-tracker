const home = require('../controllers/homeController');
const admin = require('../controllers/admin/dashboardController');
const personnel = require('../controllers/admin/personnelController');
const report = require('../controllers/reportController');
const auth = require('../controllers/authController');

module.exports.initialise = (router) => {
    router.get('/', home.index);
    router.get('/login');
    router.get('/signup');
    router.get('/newreport', report.index);
    router.get('/admin/dashboard', admin.index);
    router.get('/admin/personnel', personnel.index);
    router.get('/admin/new', personnel.new);


    // POST
    router.post('/newreport', report.create);
    router.post('/resolve', admin.resolve);
    router.post('/admin/create', personnel.create);

    return router;
};