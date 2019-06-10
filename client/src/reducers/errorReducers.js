import { GET_ERRORS } from '../actions/types';

const initialState = {
    errors: {}
}

const reducer = (state = initialState, action) => {
    switch(action){
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;