import axios from "axios";
import { SET_PROF_RATING } from '../actions/types';

export const getCourse = (term, subject) => dispatch => {
    return axios
        .get(`/api/courses?term=${term}&subject=${subject}`);
}

export const getProfRating = name => dispatch => {
    return axios  
        .get(`api/rmp/${name}`)
        .then(res => dispatch(setProfRating(name, res.data)))
        .catch(err => {
            dispatch(setProfRating(name, null))
        });
}

const setProfRating = (name, rating) => {
    return {
        type: SET_PROF_RATING,
        payload: { name, rating }
    }
}