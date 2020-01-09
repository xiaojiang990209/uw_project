const HousingGroupPost = require('../models/HousingGroupPost');
const CarpoolGroupPost = require('../models/CarpoolGroupPost');
const { FB_GROUP_TYPES } = require('../../utils/constants');

class FBGroupRepository {
    getGroupPosts({ city, created_at, type }) {
    switch (type) {
      case FB_GROUP_TYPES.HOUSING:
        return this._getGroupPosts(HousingGroupPost, city, created_at);
      case FB_GROUP_TYPES.CARPOOL:
        return this._getGroupPosts(CarpoolGroupPost, city, created_at);
    }
  }

  _getGroupPosts(model, city, timestamp) {
    const query = timestamp ?
      ({ location: city, created_at: { $lt: timestamp } }) :
      ({ location: city });

    return model.find(query)
      .sort([['created_at', -1]])
      .limit(20)
      .exec();
  }
}

module.exports = new FBGroupRepository();
