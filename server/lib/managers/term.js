const service = require('../services/TermService');
const HTTP_STATUS = require('../../utils/statusCodes');

const updateTermHandler = (req, res) => {
  service.updateTermJson()
    .then(() => res.json({ success: true }))
    .catch(() => res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false }));
}

const getTermHandler = (req, res) => {
  service.loadTermJson()
    .then((data) => res.json(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err }));
}

module.exports = {
  updateTermHandler,
  getTermHandler
}