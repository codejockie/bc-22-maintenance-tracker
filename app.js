require('dotenv').config();
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
    flash = require('express-flash-2');


const app = express();
const port = process.env.PORT || 4200;
const url = process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_URL
    : process.env.MLAB_URL;

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });
hbs.registerHelper("inc", (value, options) => {
    return parseInt(value) + 1;
});
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
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
const router = routes.initialise(express.Router());
app.use('/', router);

app.use(express.static(`${__dirname}/public`));

mongoose.connect(url);

app.listen(port); 