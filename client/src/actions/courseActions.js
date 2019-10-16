import axios from "axios";
import { SET_PROF_RATING, SET_COURSE_DESCRIPTION } from '../actions/types';

export const getCourseSchedule = (term, subject) => dispatch => {
    return axios
        .get(`/schedule/${term}/${subject}`);
}

export const getCourseDescription = course => dispatch => {
    // Set the corresponding course to null first before actually 
    // fetching it so that axios requests don't cram the network
    dispatch(setCourseDescription(course, null));
    const [ subject, number ] = course.split(' ');
    return axios
        .get(`/schedule/detail/${subject}/${number}`)
        .then(res => dispatch(setCourseDescription(course, res.data)))
        .catch(err => console.log(err));
}

export const getProfRating = name => dispatch => {
    dispatch(setProfRating(name, null));
    return axios  
        .get(`/rating/${name}`)
        .then(res => dispatch(setProfRating(name, res.data)))
        .catch(err => console.log(err));
}

const setProfRating = (name, rating) => {
    return {
        type: SET_PROF_RATING,
        payload: { name, rating }
    };
}

const setCourseDescription = (course, description) => {
    return {
        type: SET_COURSE_DESCRIPTION,
        payload: { course, description }
    };
}