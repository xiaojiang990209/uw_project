const service = require('../services/LibraryBookingService');
const HTTP_STATUS = require('../../utils/statusCodes');

const getDatesHandler = (req, res) => {
  service.getDates()
    .then((data) => res.json(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err: true }));
}

const getBuildingHandler = (req, res) => {
  service.getBuildings()
    .then((data) => res.json(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err: true }));
}

const getRoomHandler = (req, res) => {
  const { day, area } = req.query;
  service.getRooms(day, area)
    .then((data) => res.send(data))
    .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err: true }));
}

module.exports = {
  getDatesHandler,
  getBuildingHandler,
  getRoomHandler
};
