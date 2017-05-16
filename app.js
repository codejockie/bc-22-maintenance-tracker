const express = require('express');
const hbs = require('hbs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    routes = require('./server/routes'),
    passport = require('passport'),
    expressSession = require('express-session'),
    bCrypt = require('bcrypt'),
    flash = require('connect-flash'),
    initPassport = require('./passport/init');

let app = express();
const port = process.env.PORT || 4000;
const url = app.get('env') === 'development'
    ? 'mongodb://localhost:27017/mTracker' : 'mongodb://mTracker:passed@ds143181.mlab.com:43181/mtracker';

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });
hbs.registerHelper("inc", (value, options) => {
    return parseInt(value) + 1;
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Passport
app.use(expressSession({ secret: 'mTracker' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialise passport
initPassport(passport);

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