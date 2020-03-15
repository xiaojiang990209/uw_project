const { FB_GROUP_TYPES } = require('./constants');
const FBGroupRepository = require('../../repository/FBGroupRepository');

class FBGroupService {
  _constructPostResponse(data) {
    let nextTimestamp = Math.min.apply(null, data.map((d) => d.created_at));

    const postsWithNextTimestamp = data.filter((d) => d.created_at === nextTimestamp);
    if (postsWithNextTimestamp.length > 1) {
      data = data.filter((d) => d.created_at !== nextTimestamp);
      nextTimestamp = Math.min.apply(null, data.map((d) => d.created_at));
    }
  
    return ({
      data,
      nextTimestamp
    }); 
  }

  /**
   *  getFBGroupPosts: fetches group post from MongoDB using repository
   *  request would contain the following query params:
   *    - type: housing / carpool
   *    - limit: size of paginated response (nullable)
   *    - created_at: the start timestamp for the next page response (nullable)
   *    - city
   *
   *  response would follow the following format:
   *  {
   *    data: [FBGroupPost],
   *    next_timestamp: Timestamp to pass back for next response page
   *  }
   *
   */
  getFBGroupPosts(params) {
    const { type } = params;
    const fbGroupType = FB_GROUP_TYPES[type.toUpperCase()];
    const query = ({
      ...params,
      type: fbGroupType
    });

    return FBGroupRepository
      .getGroupPosts(query)
      .then((data) => this._constructPostResponse(data));
  }
}

module.exports = new FBGroupService();

