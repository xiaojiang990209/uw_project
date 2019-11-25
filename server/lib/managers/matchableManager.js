const HTTP_STATUS = require('../../utils/statusCodes');
const MatchableGroup = require('../models/MatchableGroup');
const moment = require('moment');
const _ = require('lodash');

/**
 * {
 *   exactMatch : [MatchableGroup],
 *   fuzzyMatch: [MatchableGroup],
 * }
 */
const fetchGroupHandler = (req, res) => {
    const {maxMembers, courseID, date, hasTime} = req.body; //date has to be in Date format
    const parsedDate = new Date(date);
    const today = new Date();
    const isToday = parsedDate.getDate() === today.getDate() && parsedDate.getMonth() === today.getMonth() && parsedDate.getFullYear() === today.getFullYear();
    const dateMin = isToday ? today : moment(parsedDate).startOf('day');
    const dateMax = moment(parsedDate).endOf('day');

    //TODO: limit the size of return
    //TODO: return with full
    MatchableGroup.find({groupSize: { $lte: maxMembers}, courseID, startDate: {$gte: dateMin}, endDate: {$lte: dateMax }, isFull: false})
        .then(groups => {
            console.log(groups);
            let data = {};
            if(!groups) return res.status(HTTP_STATUS.NO_CONTENT);
            data.exactMatch = hasTime ? groups.filter((group) => (group.startDate <= parsedDate && parsedDate <= group.endDate)) : [];
            console.log("exact match",  data.exactMatch)
            data.fuzzyMatch = groups.filter((group) => !data.exactMatch.includes(group));
            return res.json(data);
        }
    );
};


const registerGroupHandler = (req, res) => {
    const { groupSize, courseID, startDate, duration, userID } = req.body;
    const parsedStartDate = new Date(startDate);
    let endDate = moment(parsedStartDate).add( Math.floor(duration), "h").add((duration%1)*60, "m");
    const newGroup = new MatchableGroup({groupSize, courseID, startDate: parsedStartDate, endDate, users: [userID], isFull: false});
    newGroup.save()
        .then(() => {
            res.json({success: true});
        })
        .catch(err => console.log(err));
};

const updateGroupHandler = async (req, res) => {
    const {groupID, userID} = req.body;
    const groupJoining =  await MatchableGroup.findById(groupID).exec();

    groupJoining.users.find((id) => id.toString().localeCompare(userID) === 0) ?
        _.remove(groupJoining.users, (id) => id.toString().localeCompare(userID) === 0) :
        groupJoining.users.push(userID);

    if(!groupJoining.users.length) await MatchableGroup.findByIdAndDelete(groupID).exec();
    if(groupJoining.groupSize === groupJoining.users.length) groupJoining.isFull = true;

    groupJoining.save().then(() => {
        res.json({success: true});
    }).catch(err => console.log(err));
};

module.exports = {
    registerGroupHandler,
    fetchGroupHandler,
    updateGroupHandler,
};