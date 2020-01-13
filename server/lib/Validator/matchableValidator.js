const isEmpty = require('is-empty');
const HTTP_STATUS = require('../../utils/statusCodes');
const _ = require('lodash');

const registerGroupValidator = (req, res, next) => {
    let data = Object.assign({}, req.body);
    let errors = {};

    if (isEmpty(data.groupName)) errors.groupName = "Group name is required";
    if (isEmpty(data.subject))   errors.subject = "Subject is required";
    if (isEmpty(data.time))  errors.date = "Time of the study is required";
    if (isEmpty(data.groupSize)) errors.groupSize = "group size is required";

    if(!_.isEqual(errors, {}))  return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
    next();
};

module.exports = {
    registerGroupValidator,
};
