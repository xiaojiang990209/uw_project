const HTTP_STATUS = require('../../utils/statusCodes');
const { FB_GROUP_TYPES } = require('../../utils/constants');

const FBGroupRepository = require('../repository/FBGroupRepository');

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
const getFBGroupPosts = (req, res) => {
  const query_params = req.query;
  const fbGroupType = FB_GROUP_TYPES[query_params.type.toUpperCase()];
  return FBGroupRepository
    .getGroupPosts({ ...query_params, type: fbGroupType })
    .then((data) => res.json(_constructPostResponse(data)))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err }));
}

const _constructPostResponse = (data) => {
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

module.exports = { getFBGroupPosts };

