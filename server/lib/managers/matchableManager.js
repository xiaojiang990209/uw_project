const HTTP_STATUS = require('../../utils/statusCodes');
const MatchableGroup = require('../models/MatchableGroup');
const _ = require('lodash');

const fetchGroupsHandler = (req, res) => {
    MatchableGroup.find({}).then((groups) => {
        const subjectGroupsMap = {}; //<Subject, number of groups>
        groups.forEach((group) => {
            if(!subjectGroupsMap[group.subject]) subjectGroupsMap[group.subject] = 1;
            else subjectGroupsMap[group.subject]++;
        });

        return res.json(Object.keys(subjectGroupsMap).map((k) => ({ subject: k, count: subjectGroupsMap[k] })));
    }).catch(err => {
        console.log(err);
        res.status(HTTP_STATUS.BAD_REQUEST).send("ERROR: fetching groups error");
    });
};


const fetchBySubjectHandler = (req, res) => {
    const { subject } = req.params;

  MatchableGroup.find({subject: subject}).then((groups) => {
    return res.json(groups);
  }).catch(err => {
        console.log(err);
        res.status(HTTP_STATUS.BAD_REQUEST).send("ERROR: find by subject error");
    });
};


const registerGroupHandler = (req, res) => {
    const { groupName, subject, courseId, time, groupSize, location, description, userId} = req.body;
    const timestamp = new Date(time).getTime();

    const newGroup =
        new MatchableGroup({groupName, subject, courseId, time: timestamp, groupSize, users: [userId],  location, description, isFull: false});
    newGroup.save()
        .then(() => {
            return res.json({id: newGroup._id});
        })
        .catch(err => console.log(err));
};

const patchGroupHandler = async (req, res) => {
    const {groupId} = req.params;
    const {users} = req.body;
    const targetGroup =  await MatchableGroup.findById(groupId).exec();

    //checking the users length exceed the limit
    if(users.length > targetGroup.groupSize){
        res.status(HTTP_STATUS.BAD_REQUEST).send("ERROR: max number of groups members exceeded");
    }

    targetGroup.users = users;
    if(targetGroup.groupSize === users.length) targetGroup.isFull = true;


    targetGroup.save().then(() => {
        res.json({success: true});
    }).catch(err => console.log(err));
};

const getOneGroupHandler = async (req, res) => {
    const { groupId } = req.params;
    const targetGroup =  await MatchableGroup.findById(groupId).exec();

    return res.json(targetGroup);
};

module.exports = {
    fetchGroupsHandler,
    fetchBySubjectHandler,
    registerGroupHandler,
    patchGroupHandler,
    getOneGroupHandler,
};
