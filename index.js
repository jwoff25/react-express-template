const express = require('express');
const app = express();

// Test route
app.get('/api/v1', (req,res) => {
    res.send({hello:"world"});
});

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