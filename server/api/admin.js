const { updateTermJson } = require('../utils/adminUtils');
const HTTP_STATUS = require('../utils/statusCodes');

const updateTermHandler = (req, res) => {
  updateTermJson()
    .then(() => res.json({ success: true }))
    .catch(() => res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false }));
}

module.exports = {
  updateTermHandler
}