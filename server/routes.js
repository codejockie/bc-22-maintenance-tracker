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
    router.get('/', isAuthenticated, home.index);
    router.get('/login', auth.index);
    router.get('/logout', auth.logout);
    router.get('/signup', auth.signup);
    router.get('/newreport', report.index);
    router.get('/admin/dashboard', admin.index);
    router.get('/admin/personnel', personnel.index);
    router.get('/admin/new', personnel.new);


    // POST
    router.post('/newreport', report.create);
    router.post('/resolve', admin.resolve);
    router.post('/admin/create', personnel.create);
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/newreport',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    return router;
};