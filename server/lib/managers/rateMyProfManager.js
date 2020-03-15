const service = require('../services/RateMyProfService');
const HTTP_STATUS = require('../../utils/statusCodes');

profInfoHandler = (req, res) => {
  const name = req.params.name;

  service.fetchProfInfo(name)
    .then(info => res.json(info))
    .catch(err => res.status(HTTP_STATUS.NOT_FOUND).json(err))
}

profInfoListHandler = (req, res) => {
  const { names } = req.body;

  service.fetchProfInfoList(names)
    .then(infos => res.json(infos));
};

module.exports = {
    profInfoHandler,
    profInfoListHandler
}