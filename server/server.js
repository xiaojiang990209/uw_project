const express = require('express');
const bodyParser = require('body-parser');

const rateMyProf = require('./routes/api/rateMyProf');

const app = express();

app.use(bodyParser.json());

app.use('/api/rmp', rateMyProf);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});