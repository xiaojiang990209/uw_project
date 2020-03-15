const HousingGroupPost = require('../models/HousingGroupPost');
const CarpoolGroupPost = require('../models/CarpoolGroupPost');
const { FB_GROUP_TYPES } = require('../services/FBGroupService/constants');

DEFAULT_QUERY_LIMIT = 30;

class FBGroupRepository {
  getGroupPosts({ city, created_at, limit, type }) {
    switch (type) {
      case FB_GROUP_TYPES.HOUSING:
        return this._getGroupPosts(HousingGroupPost, city, created_at, limit);
      case FB_GROUP_TYPES.CARPOOL:
        return this._getGroupPosts(CarpoolGroupPost, city, created_at, limit);
    }
  }

  _getGroupPosts(model, city, timestamp, limit) {
    const query = timestamp ?
      ({ location: city, created_at: { $lt: timestamp } }) :
      ({ location: city });
    const queryLimit = parseInt(limit) || DEFAULT_QUERY_LIMIT;

    return model.find(query)
      .sort([['created_at', -1]])
      .limit(queryLimit)
      .exec();
  }
}

module.exports = new FBGroupRepository();
