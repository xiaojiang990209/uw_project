const isEmpty = require('is-empty');
const HTTP_STATUS = require('../../utils/statusCodes');

const currentGroupValidator = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.maxMembers)) errors.maxMembers = "Max number of members is required";
    if (isEmpty(req.body.courseID)) errors.courseID = "Course id is required";
    if (isEmpty(req.body.date)) errors.date = "Date of the study is required";
    if (isEmpty(req.body.studyPeriod)) errors.studyPeriod = "Length of study is required";

   if(errors)  return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
   next();
};

module.exports = {
    currentGroupValidator,
};