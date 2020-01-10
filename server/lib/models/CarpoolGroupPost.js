const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarpoolGroupPostSchema = new Schema({
  post_id: {
    type: Number,
    required: true,
  },
  post_url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  content: {
    type: String,
  },
  photos: {
    type: [String]
  },
  location: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  }
}, { collection: 'carpool_group_post' });

module.exports = mongoose.model('CarpoolGroupPost', CarpoolGroupPostSchema);

