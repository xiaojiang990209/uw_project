const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: we can add program, year
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    favouriteCourses: [{
        subject: String,
        code: String,
        term: String
    }]
});

module.exports = User = mongoose.model('User', UserSchema);
