import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import course, * as Course from './course';
import session, * as Session from './session';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    [Session.STATE_KEY]: session,
    [Course.STATE_KEY]: course,
  });
