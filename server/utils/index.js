const courseUtils = require('./courseUtils');
const rateMyProfUtils = require('./rateMyProfUtils');
const globalUtils = require('./globalUtils');

module.exports = {
    ...courseUtils,
    ...rateMyProfUtils,
    ...globalUtils
}