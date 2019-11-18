const mongoose = require(mongoose);
const Schema = mongoose.Schema;

//a study group
const MatchableGroupSchema = new Schema({
    courseID: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    groupSize: {
        type: Number,
        required: true,
    },
    users: {
        type: [String],
    }
});

module.exports = User = mongoose.model('matchableGroup', MatchableGroupSchema);