import axios from "axios";
import { SET_PROF_RATING, SET_COURSE_DESCRIPTION } from '../actions/types';

export const getCourseSchedule = (term, subject) => dispatch => {
    return axios
        .get(`/api/courses/schedule/${term}/${subject}`);
}

export const getCourseDescription = course => dispatch => {
    return axios
        .get(`/api/courses/description/${course}`)
        .then(res => dispatch(setCourseDescription(course, res.data)))
        .catch(err => dispatch(setCourseDescription(course, null)));
}

export const getProfRating = name => dispatch => {
    return axios  
        .get(`api/rmp/${name}`)
        .then(res => dispatch(setProfRating(name, res.data)))
        .catch(err => dispatch(setProfRating(name, null)));
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
        payload: {course, description }
    };
}