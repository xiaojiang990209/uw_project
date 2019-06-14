import {
    SET_PROF_RATING,
    SET_COURSE_DESCRIPTION
} from '../actions/types';

const initialState = {
    ratingsMap: {},
    descriptions: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PROF_RATING:
            return {
                ...state,
                ratingsMap: {
                    ...state.ratingsMap,
                    [action.payload.name]: action.payload.rating
                }
            };
        case SET_COURSE_DESCRIPTION:
            return {
                ...state,
                descriptions: {
                    ...state.descriptions,
                    [action.payload.course]: action.payload.description
                }
            };

        default:
            return state;
    }
};

export default reducer;