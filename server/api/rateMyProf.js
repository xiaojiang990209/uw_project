const { fetchProfInfo } = require('../utils');
const HTTP_STATUS = require('../utils/statusCodes');

profInfoHandler = (req, res) => {
  const name = req.params.name;
  fetchProfInfo(name)
    .then(info => res.json(info))
    .catch(err => res.status(HTTP_STATUS.NOT_FOUND).json(err))
}

profInfoListHandler = (req, res) => {
  const { names } = req.body;

  Promise.all(names.map(name => fetchProfInfo(name).catch(err => {})))
    .then(values => values.filter(val => val != null))
    .then(values => res.json(values));
};

module.exports = {
    profInfoHandler,
    profInfoListHandler
}