const home = require('../controllers/homeController');
const admin = require('../controllers/admin/dashboardController');
const personnel = require('../controllers/admin/personnelController');
const report = require('../controllers/reportController');
const auth = require('../controllers/authController');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.flash('error', 'Unauthorised User');
    res.redirect('/');
};

module.exports.initialise = (router) => {
    router.get('/', home.index);
    router.get('/logout', auth.logout);
    router.get('/signup', auth.signup);
    router.get('/report', isAuthenticated, report.index);
    router.get('/admin/dashboard', isAuthenticated, admin.index);
    router.get('/admin/personnel', isAuthenticated, personnel.index);
    router.get('/admin/personnel/new', isAuthenticated, personnel.new);


    // POST
    router.post('/report', report.create);
    router.post('/approve', admin.approve);
    router.post('/reject', admin.reject);
    router.post('/resolve', admin.resolve);
    router.post('/create', personnel.create);
    router.post('/login', auth.login);
    router.post('/signup', auth.register);

    return router;
};