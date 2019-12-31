const HTTP_STATUS = require('../../utils/statusCodes');
const MatchableGroup = require('../models/MatchableGroup');
const User = require('../models/User');
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

    MatchableGroup.find({groupSize: { $lte: maxMembers}, startDate: {$gte: dateMin}, endDate: {$lte: dateMax }})
        .then(allGroups => {
            let data = {};
            if(!allGroups.length) return res.status(HTTP_STATUS.NO_CONTENT).end();

            const groups = allGroups.filter(group => group.courseID === courseID);
            const fullGroups = groups.filter((group) => group.isFull);
            const unFullGroups =  groups.filter((group) => !group.isFull);
            const subject = courseID.split(" ")[0];
            const sameSubjectGroups = allGroups.filter(group => group.courseID !== courseID && group.courseID.startsWith(subject));

            const userGroups = groups.filter((group) => group.users[userID]).map((group) => ({...group, hasUser: true})); //groups that you are in for this date, ALL
            const exactMatchFull = fullGroups.filter((group) => group.startDate <= parsedDate && parsedDate <= group.endDate) && !userGroups.includes(userGroups);//groups exact match and full, ALL
            data.disabled = userGroups.concat(exactMatchFull);

            //all the group exact match unfull and you are not in, ALL
            data.exactMatch = hasTime ? unFullGroups.filter((group) => (group.startDate <= parsedDate && parsedDate <= group.endDate && !userGroups.includes(group))) : [];

            //TODO: limit the size of return
            //all the group fuzzy match unfull and you are not in, 10
            data.fuzzyMatch = unFullGroups
              .filter((group) => !data.exactMatch.includes(group) && !userGroups.includes(group))
              .concat(sameSubjectGroups);

            return res.json(data);
        })
        .catch(err => { console.log(err); res.err({}); });
};


const registerGroupHandler = (req, res) => {
    const { groupSize, courseID, startDate, duration, userID, location } = req.body;
    const parsedStartDate = new Date(startDate);
    let endDate = moment(parsedStartDate).add( Math.floor(duration), "h").add((duration%1)*60, "m");
    const newGroup = new MatchableGroup({groupSize, courseID, startDate: parsedStartDate, endDate, users: [userID], isFull: false, location});
    newGroup.save()
        .then(() => {
            res.json({id: newGroup._id});
        })
        .catch(err => console.log(err));
};

const updateGroupHandler = async (req, res) => {
    const {groupID, userID} = req.body;
    const groupJoining =  await MatchableGroup.findById(groupID).exec();
    const existingUser = groupJoining.users.find((id) => id.toString().localeCompare(userID) == 0);

    if (existingUser) {
      _.remove(groupJoining.users, existingUser);
    } else {
      groupJoining.users.push(userID);
    }

    if (!groupJoining.users.length) {
      await MatchableGroup.findByIdAndDelete(groupID).exec();
    } else {
      groupJoining.markModified('users');
    }

    if(groupJoining.groupSize === groupJoining.users.length) groupJoining.isFull = true;

    groupJoining.save().then(() => {
        res.json({success: true});
    }).catch(err => console.log(err));
};

const getGroupHandler = async (req, res) => {
    const { groupId } = req.params;
    const userMapper = (user) => ({ id: user._id, name: user.name });
    try {
      const group = (await MatchableGroup.findById(groupId).exec()).toObject();
      const users = (await User.find({ '_id': { $in: group.users } }).exec())
        .map(userMapper);
      return res.json({ ...group, users });
    } catch (err) {
      console.log(err);
    }
}

module.exports = {
    getGroupHandler,
    registerGroupHandler,
    fetchGroupHandler,
    updateGroupHandler,
};
