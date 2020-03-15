const HTTP_STATUS = require('../../utils/statusCodes');
const service = require('../services/FBGroupService');

const getFBGroupPosts = (req, res) => {
  const query_params = req.query;
  return service.getFBGroupPosts(query_params)
    .then((data) => res.json(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err }));
}

module.exports = { getFBGroupPosts };
