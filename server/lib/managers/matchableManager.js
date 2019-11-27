const HTTP_STATUS = require('../../utils/statusCodes');
const MatchableGroup = require('../models/MatchableGroup');
const moment = require('moment');
const _ = require('lodash');

/**
 * {
 *   disabled:       [MatchableGroup], groups that current user is in or it is full
 *   exactMatch :    [MatchableGroup],
 *   fuzzyMatch:     [MatchableGroup],
 * }
 */
const fetchGroupHandler = (req, res) => {
    const {maxMembers, courseID, date, hasTime, userID} = req.body; //date has to be in Date format
    const parsedDate = new Date(date);
    const today = new Date();
    const isToday = parsedDate.getDate() === today.getDate() && parsedDate.getMonth() === today.getMonth() && parsedDate.getFullYear() === today.getFullYear();
    const dateMin = isToday ? today : moment(parsedDate).startOf('day');
    const dateMax = moment(parsedDate).endOf('day');


    MatchableGroup.find({groupSize: { $lte: maxMembers}, courseID, startDate: {$gte: dateMin}, endDate: {$lte: dateMax }})
        .then(groups => {
            let data = {};
            if(!groups.length) return res.status(HTTP_STATUS.NO_CONTENT);

            const fullGroups = groups.filter((group) => group.isFull);
            const unFullGroups =  groups.filter((group) => !group.isFull);

            const userGroups = groups.filter((group) => group.users[userID]).forEach((group) => {group.hasUer = true}); //groups that you are in for this date, ALL
            const exactMatchFull = fullGroups.filter((group) => group.startDate <= parsedDate && parsedDate <= group.endDate) && !userGroups.includes(userGroups);//groups exact match and full, ALL
            data.disabled = userGroups.concat(exactMatchFull);

            //all the group exact match unfull and you are not in, ALL
            data.exactMatch = hasTime ? unFullGroups.filter((group) => (group.startDate <= parsedDate && parsedDate <= group.endDate && !data.userGroups.includes(group))) : [];

            //TODO: limit the size of return
            //all the group fuzzy match unfull and you are not in, 10
            data.fuzzyMatch = unFullGroups.filter((group) => !data.exactMatch.includes(group) && !data.userGroups.includes(group));

            return res.json(data);
        }
    );
};


const registerGroupHandler = (req, res) => {
    const { groupSize, courseID, startDate, duration, userID, location } = req.body;
    const parsedStartDate = new Date(startDate);
    let endDate = moment(parsedStartDate).add( Math.floor(duration), "h").add((duration%1)*60, "m");
    const newGroup = new MatchableGroup({groupSize, courseID, startDate: parsedStartDate, endDate, users: [userID], isFull: false, location});
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