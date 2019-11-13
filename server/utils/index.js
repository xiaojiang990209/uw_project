const uwApiUtils = require('./uwApiUtils');
const rateMyProfUtils = require('./rateMyProfUtils');
const globalUtils = require('./globalUtils');

module.exports = {
    ...uwApiUtils,
    ...rateMyProfUtils,
    ...globalUtils,
}