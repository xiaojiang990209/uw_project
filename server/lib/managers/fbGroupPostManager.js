const HTTP_STATUS = require('../../utils/statusCodes');
const { FB_GROUP_TYPES } = require('../../utils/constants');

const FBGroupRepository = require('../repository/FBGroupRepository');

// Assume path of the kind
// 1. '/housing?city=Toronto' if first query
// 2. '/housing?city=Toronto&created_at=214930290'

const getFBGroupPosts = (req, res) => {
  const query_params = req.query;
  const fb_group_type = FB_GROUP_TYPES[query_params.type.toUpperCase()];
  return FBGroupRepository
    .getGroupPosts({ ...query_params, type: fb_group_type })
    .then((data) => res.json(_construct_post_response(data)))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err }));
}

const _construct_post_response = (data) => {
  const next_timestamp = Math.min.apply(null, data.map((d) => d.created_at));
  return ({
    data,
    next_timestamp
  });
}

module.exports = { getFBGroupPosts };

