const home = require('../controllers/homeController');
const admin = require('../controllers/admin/dashboardController');
const personnel = require('../controllers/admin/personnelController');
const report = require('../controllers/reportController');
const auth = require('../controllers/authController');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports.initialise = (router, passport) => {
    router.get('/', home.index);
    router.get('/login', auth.index);
    router.get('/logout', auth.logout);
    router.get('/signup', auth.signup);
    router.get('/report', isAuthenticated, report.index);
    router.get('/admin/dashboard', isAuthenticated, admin.index);
    router.get('/admin/personnel', isAuthenticated, personnel.index);
    router.get('/admin/new', isAuthenticated, personnel.new);


    // POST
    router.post('/report', report.create);
    router.post('/resolve', admin.resolve);
    router.post('/admin/create', personnel.create);
    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password'
    }), auth.login);
    router.post('/signup', auth.register);

    return router;
};