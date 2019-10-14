const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const api = require('./api')
const db = require('./config/keys').MONGO_URI;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Initialize MongoDB database
 */
mongoose.connect(
    db, { useNewUrlParser: true }
)
.then(console.log('MongoDB connection created!'))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// routes
app.use('/api', api);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    var Path = path.join(__dirname, '/client/build/index.html');
    res.sendFile(Path);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
