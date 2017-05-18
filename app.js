const express = require('express'),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    routes = require('./server/routes'),
    passport = require('passport'),
    session = require('express-session'),
    expressValidator = require('express-validator'),
    bcrypt = require('bcryptjs'),
    flash = require('express-flash-2'),
    dotenv = require('dotenv');


dotenv.config();
let app = express();
const port = process.env.PORT || 4000;
const url = app.get('env') === 'development'
    ? 'mongodb://localhost:27017/mTracker'
    : process.env.DB;

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });
hbs.registerHelper("inc", (value, options) => {
    return parseInt(value) + 1;
});
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({ secret: 'mTracker' }));
app.use(flash());

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
    app.locals.user = req.user || null;
    next();
});

// Get defined routes from routes.js
const router = routes.initialise(express.Router(), passport);
app.use('/', router);

app.use(express.static(`${__dirname}/public`));

mongoose.connect(url);
mongoose.connection.on('open', () => {
    console.log('Mongoose connected');
});

app.listen(port, () => {
    console.log(`Server up: http://localhost:${port}`);
}); 