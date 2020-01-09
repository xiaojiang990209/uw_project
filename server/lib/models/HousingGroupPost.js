const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HousingGroupPostSchema = new Schema({
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
}, { collection: 'housing_group_post' });

module.exports = mongoose.model('HousingGroupPost', HousingGroupPostSchema);

