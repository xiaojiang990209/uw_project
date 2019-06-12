import {
    SET_PROF_RATING
} from '../actions/types';

const initialState = {
    ratingsMap: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PROF_RATING:
            let newState = {
                ...state,
                ratingsMap: {...state.ratingsMap, 
                    [action.payload.name]: action.payload.rating
            }};
            return newState;
        default:
            return state;
    }
};

export default reducer;