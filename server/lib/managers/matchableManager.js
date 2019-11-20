const Group = require('../models/MatchableGroup');
const HTTP_STATUS = require('../../utils/statusCodes');
const MatchableGroups = require('../models/MatchableGroup');
const moment = require('moment');

const registerGroupHandler = (req, res) => {

   // const { maxMembers, courseID, date, length } = req.body.
};

const fetchGroupHandler = (req, res) => {
   //date has to be in Date format
   const {maxMembers, courseID, date, time, hasDateOnly} = req.body;

    if(time){
        //startDate <= time <= endDate
        //
    }else{

    }
      MatchableGroups.find({groupSize: { $lte: maxMembers}, courseID, date: hasDateOnly ? {  $gte: date.toDate(), $lte: moment(date).endOf('day').toDate() } :
             {}}).then(groups => {
                if(!groups) return res.status(HTTP_STATUS.NO_CONTENT).json({ error: 'No groups found'});
                return res.json(groups);
          }
      );
};

module.exports = {
   registerGroupHandler,
   fetchGroupHandler
};