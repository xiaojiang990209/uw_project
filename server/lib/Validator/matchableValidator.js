const isEmpty = require('is-empty');
const HTTP_STATUS = require('../../utils/statusCodes');
const _ = require('lodash');

const currentGroupValidator = (req, res, next) => {
    let data = Object.assign({}, req.body);
    let errors = {};

    if (isEmpty(data.maxMembers)) errors.maxMembers = "Max number of members is required";
    if (isEmpty(data.courseID))   errors.courseID = "Course id is required";
    if (isEmpty(data.date))  errors.date = "Date of the study is required";
    if (isEmpty(data.hasTime)) errors.hasTime = "hasTime is required";

   if(!_.isEqual(errors, {}))  return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
   next();
};

const registerGroupValidator = (req, res, next) => {
    let data = Object.assign({}, req.body);
    let errors = {};

    if (isEmpty(data.userID)) errors.userID = "user id is required";
    if (isEmpty(data.courseID)) errors.courseID = "Course id is required";
    if (isEmpty(data.startDate)) errors.startDate = "Start date is required";
    if (isEmpty(data.duration)) errors.duration = "Duration of the study is required";
    if (isEmpty(data.groupSize))  errors.groupSize = "Group Size is required";

    if(!_.isEqual(errors, {}))  return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
    next();
};

module.exports = {
    currentGroupValidator,
    registerGroupValidator
};