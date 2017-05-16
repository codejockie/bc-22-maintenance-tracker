module.exports = {
    index: (req, res) => {
        res.render('login', { message: req.flash('message') });
    },
    logout: (req, res) => {
        res.logout();
        res.redirect('/');
    },
    signup: (req, res) => {
        res.render('register', { message: req.flash('message') });
    }
};