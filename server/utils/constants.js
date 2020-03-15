const terms = require('../data/terms.json');

module.exports = {
    UW_TERM_URL: 'http://www.adm.uwaterloo.ca/infocour/CIR/SA/under.html',
    UW_LIB_BOOKING_URL: 'https://bookings.lib.uwaterloo.ca/sbs/day.php',
    UW_LIB_BOOKING_PREFIX: 'https://bookings.lib.uwaterloo.ca/sbs',
    FB_GROUP_TYPES: Object.freeze({
        "HOUSING": 1,
        "CARPOOL": 2,
    }),
    ...terms
};
