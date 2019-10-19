import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import courseReducer from './courseReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  course: courseReducer,
});
