const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');

const rateMyProf = require('./routes/api/rateMyProf');
const admCourse = require('./routes/api/admCourse');

const app = express();

app.set('json spaces', 2);
app.use(bodyParser.json());
app.use('/api/rmp', rateMyProf);
app.use('/api/courses', admCourse);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    var Path = path.join(__dirname, '/client/build/index.html');
    res.sendFile(Path);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
