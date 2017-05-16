const express = require('express');
const hbs = require('hbs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    routes = require('./server/routes');

let app = express();
const port = process.env.PORT || 4000;
const url = app.get('env') === 'development'
    ? 'mongodb://localhost:27017/mTracker' : '';

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get defined routes from routes.js
const router = routes.initialise(express.Router());
app.use('/', router);

app.use(express.static(`${__dirname}/public`));

mongoose.connect(url);
mongoose.connection.on('open', () => {
    console.log('Mongoose connected');
});
mongoose.connection.on('close', () => {
    console.log('Mongoose disconnected');
});

app.listen(port, () => {
    console.log(`Server up: http://localhost:${port}`);
});