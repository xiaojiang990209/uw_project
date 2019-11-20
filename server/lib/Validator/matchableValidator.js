const isEmpty = require('is-empty');
const HTTP_STATUS = require('../../utils/statusCodes');
const Validator = require('validator');

const currentGroupValidator = (req, res, next) => {
    let data = Object.assign({}, req.body);
    let errors = {};

    if (isEmpty(data.maxMembers)) data.maxMembers = "";
    if (isEmpty(data.courseID)) data.courseID = "";
    if (isEmpty(data.date)) data.date = "";
    if (isEmpty(data.hasTime)) data.hasTime = "";


    if (Validator.isEmpty(data.maxMembers)) {
        errors.maxMembers = "Max number of members is required";
    }

    if (Validator.isEmpty(data.courseID)) {
        errors.courseID = "Course id is required";
    }

    if (Validator.isEmpty(data.date)) {
        errors.date = "Date of the study is required";
    }

    if (Validator.isEmpty(data.hasTime)) {
        errors.date = "hasTime is required";
    }

   if(errors)  return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
   next();
};

const createGroupValidator = (req, res, next) => {
    let data = Object.assign({}, req.body);
    let errors = {};

    if (isEmpty(data.courseID)) data.courseID = "";
    if (isEmpty(data.startDate)) data.startDate = "";
    if (isEmpty(data.duration))data.duration = "";
    if (isEmpty(data.groupSize)) data.groupSize = "";

    if (Validator.isEmpty(data.courseID)) {
        errors.courseID = "Course id is required";
    }

    if (Validator.isEmpty(data.startDate)) {
        errors.startDate = "Start date is required";
    }

    if (Validator.isEmpty(data.duration)) {
        errors.duration = "Duration of the study is required";
    }

    if (Validator.isEmpty(data.groupSize)) {
        errors.groupSize = "Group Size is required";
    }

    if(errors)  return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
    next();
};

module.exports = {
    currentGroupValidator,
    createGroupValidator
};