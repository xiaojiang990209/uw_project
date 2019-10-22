const { fetchProfInfo } = require('../utils');
const HTTP_STATUS = require('../utils/statusCodes');

profInfoHandler = (req, res) => {
    const name = req.params.name;
    fetchProfInfo(name)
      .then(info => res.json(info))
      .catch(err => res.status(HTTP_STATUS.NOT_FOUND).json(err))
}

module.exports = {
    profInfoHandler
}