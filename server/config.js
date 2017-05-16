const express = require('express'),
    app = express();    

module.exports = {
    'secret': 'maintenancetrackerwebapp',
    'database': app.get('dev') === 'development'  ? 'mongodb://localhost:27017/mTracker' : 'mongodb://jckennedy:kenchi10.K@ds143181.mlab.com:43181/mtracker'
};