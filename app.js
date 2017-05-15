const express = require('express');
const hbs = require('hbs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose');

const config = require('./server/config');
const User = require('./models/user');

// Routes import
const index = require('./routes/index');
const admin = require('./routes/admin');
const login = require('./routes/login');
const register = require('./routes/signup');

let app = express();
const port = process.env.PORT || 4000;

mongoose.connect(config.database);
app.set('appsecret', config.secret);

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.use('/', index);
app.use('/admin', admin);
// app.use('/register', register);
// app.use('/login', login);


app.listen(port, () => {
    console.log(`Server up: http://localhost:${port}`);
});