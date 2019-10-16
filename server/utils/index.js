const { transformScheduleResponse, transformDescriptionResponse } = require('./courseUtils');
const { transformRatingResponse } = require('./rateMyProfUtils');
const globalUtils = require('./globalUtils');

module.exports = {
    transformScheduleResponse,
    transformDescriptionResponse,
    transformRatingResponse,
    ...globalUtils
}