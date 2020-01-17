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
        res.json(groups);
    }).catch(err => {
        console.log(err);
        res.status(HTTP_STATUS.BAD_REQUEST).send("ERROR: find by subject error");
    });
};


const registerGroupHandler = (req, res) => {
    const { groupName, subject, courseId, time, groupSize, location, description } = req.body;
    const userId = req.user;
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
    const userMapper = (user) => ({ id: user._id, name: user.name });
    try {
      const group = (await MatchableGroup.findById(groupId).exec()).toObject();
      const users = (await User.find({ '_id': { $in: group.users } }).exec())
        .map(userMapper);
      return res.json({ ...group, users });
    } catch (err) {
      console.log(err);
    }
};

//Add
//postData
const updatePostsHandler = async (req, res) => {
    const { groupId } = req.params;
    const {postData} = req.body;
    const userId = '5e150846be209100070276e3';

    const group = (await MatchableGroup.findById(groupId).exec()).toObject();
    const updateObj = {timePosted: new Date().getTime(), ownerId: userId, postData: postData};

    MatchableGroup.findByIdAndUpdate(groupId, {posts: [...group.posts, updateObj]})
        .then((val) => res.json({ success: true }))
        .catch((err) => res.status(HTTP_STATUS.BAD_REQUEST).json({ err }));
};

module.exports = {
    fetchGroupsHandler,
    fetchBySubjectHandler,
    registerGroupHandler,
    patchGroupHandler,
    getOneGroupHandler,
    updatePostsHandler,
};
