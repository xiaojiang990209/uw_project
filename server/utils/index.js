const uwApiUtils = require('./uwApiUtils');
const rateMyProfUtils = require('./rateMyProfUtils');
const globalUtils = require('./globalUtils');
const newsUtils = require('./newsUtils');

module.exports = {
    ...uwApiUtils,
    ...rateMyProfUtils,
    ...globalUtils,
    ...newsUtils
}