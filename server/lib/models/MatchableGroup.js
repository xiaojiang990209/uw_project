const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchableGroupSchema = new Schema({
    courseID: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
    },
    groupSize: {
        type: Number,
        required: true,
    },
    users: {
        type:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    isFull : {
        type: Boolean,
    }
});

module.exports = MatchableGroup = mongoose.model('MatchableGroup', MatchableGroupSchema);