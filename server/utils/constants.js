const terms = require('../data/terms.json');

module.exports = {
    RMP_URL: 'https://solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select?wt=json&qf=teacherfirstname_t+teacherlastname_t+autosuggest&siteName=rmp&q=',
    RMP_PROF_URL: 'https://www.ratemyprofessors.com/ShowRatings.jsp?tid=',
    RATING_KEY: 'averageratingscore_rf',
    ID_KEY: 'pk_id',
    LAST_UPDATED: 'last_updated',
    CITY_STATE_KEY: 'city_state_s',
    UW_TERM_URL: 'http://www.adm.uwaterloo.ca/infocour/CIR/SA/under.html',
    UW_LIB_BOOKING_URL: 'https://bookings.lib.uwaterloo.ca/sbs/day.php',
    UW_LIB_BOOKING_PREFIX: 'https://bookings.lib.uwaterloo.ca/sbs',
    ...terms
};
