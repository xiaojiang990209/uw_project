const HTTP_STATUS = require('../../utils/statusCodes');
const MatchableGroup = require('../models/MatchableGroup');
const moment = require('moment');

/**
 * {
 *   exactMatch : [MatchableGroup],
 *   fuzzyMatch: [MatchableGroup],
 * }
 */
const fetchGroupHandler = (req, res) => {
    const {maxMembers, courseID, date, hasTime} = req.body; //date has to be in Date format
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    const dateMin = isToday ? today : (new Date()).setHours(0, 0,0,0);
    const dateMax = moment(date).endOf('day').toDate();

    //TODO: limit the size of return
    MatchableGroup.find({groupSize: { $lte: maxMembers}, courseID, date: {$gte: dateMin, $lte: dateMax }, isFull: false})
        .then(groups => {
            let data = {};
            if(!groups) return res.status(HTTP_STATUS.NO_CONTENT);
            data.exactMatch = hasTime ? groups.filter((group) => (group.startDate <= time && time <= group.endDate)) : [];
            data.fuzzyMatch = groups.filter((group) => !res.exactMatch.includes(group));
            return res.json(data);
        }
    );
};


const registerGroupHandler = (req, res) => {
    const { groupSize, courseID, startDate, duration } = req.body;
    const endDate = startDate.setHours(startDate.getHours+duration.floor()).setMinutes(startDate.getMinutes() + 60*duration%1);
    const newGroup = new MatchableGroup({groupSize, courseID, startDate, endDate, isFull: false});
    newGroup.save()
        .then(() => {
            res.status(HTTP_STATUS.OK);
        })
        .catch(err => console.log(err));
};

const updateGroupHandler = (req, res) => {
    const {groupID, userID, isJoin} = req.body;
    isJoin ?
        MatchableGroup.Model.findOneAndUpdate({_id: groupID}, {'$push': { users: userID }}) :
        MatchableGroup.Model.findOneAndUpdate({_id: groupID}, {'$pull': { users: userID }}, (err, group) => {
            if(err) console.log(err);
            // when the groups size is 0, delete this group
            if(!group.users.length) MatchableGroup.findOneAndDelete({_id: group._id});
    });
};

module.exports = {
    registerGroupHandler,
    fetchGroupHandler,
    updateGroupHandler,
};