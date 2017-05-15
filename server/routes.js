const home = require('../controllers/home');
const admin = require('../controllers/admin/home');

module.exports.initialise = (router) => {
    router.get('/', home.index);
    router.get('/admin', admin.index);
    router.get('/login');
    router.get('/signup');
    router.get('/admin/dashboard');

    return router;
};