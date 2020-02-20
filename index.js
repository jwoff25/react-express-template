const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');

// Instantiate Express App
const app = express();

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('userCreateIndex', true); // Fix mongoose deprecation issue

// Init Middleware
app.use(express.json({extended: false}));

// Bind Routes to App
require('./routes/userRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/profileRoutes')(app);

// Making sure routing works in prod
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Switch ports between dev and prod
const PORT = process.env.PORT || 5000;

app.listen(PORT);