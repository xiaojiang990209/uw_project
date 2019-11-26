const { getDatesJson, getBuildingJson, getRoomHtml } = require('../../utils/libraryUtils');
const HTTP_STATUS = require('../../utils/statusCodes');

const getDatesHandler = (req, res) => {
  getDatesJson()
    .then((data) => res.json(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err: true }));
}

const getBuildingHandler = (req, res) => {
  getBuildingJson()
    .then((data) => res.json(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err: true }));
}

const getRoomHandler = (req, res) => {
  const { day, area } = req.query;
  getRoomHtml(day, area)
    .then((data) => res.send(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err: true }));
}

module.exports = {
  getDatesHandler,
  getBuildingHandler,
  getRoomHandler
};
