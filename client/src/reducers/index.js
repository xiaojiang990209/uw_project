import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducers';
import errorReducer from './errorReducers';
import courseReducer from './courseReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    errors: errorReducer,
    course: courseReducer,
  });
