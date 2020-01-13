const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchableGroupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    courseId: {
        type: String,
    },
    time: {
        type: Number,
        required: true,
    },
    groupSize: {
        type: Number,
        required: true,
    },
    users: {
        type:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    isFull : {
        type: Boolean,
    }
});

module.exports = MatchableGroup = mongoose.model('MatchableGroup', MatchableGroupSchema);
