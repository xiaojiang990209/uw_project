import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import client from '../client';

export const STATE_KEY = 'session';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

//Actions

export const USER_LOADING = 'USER_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_FAVOURITE_COURSES = 'SET_FAVOURITE_COURSES';

const authorizeUser = (dispatch, res) => {
  const { token } = res.data;
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);

  const user = jwt_decode(token);
  dispatch(setCurrentUser(user));
};

export const registerUser = (userRegisterInfo, history) => (dispatch) => {
  return client.session.register(userRegisterInfo).then((res) => {
    authorizeUser(dispatch, res);
    history.push('/');
  });
};

export const loginUser = (userLoginInfo, history) => (dispatch) => {
  return client.session.login(userLoginInfo).then((res) => {
    authorizeUser(dispatch, res);
    history.push('/');
  });
};

export const updateFavouriteCourses = (courses) => (dispatch, getState) => {
  const { id, favouriteCourses } = getState().session.user;
  client.session.saveFavouriteCourses(id, favouriteCourses).then((res) => {
    dispatch(setFavouriteCourses(courses));
  });
};

const setFavouriteCourses = (courses) => {
  return {
    type: SET_FAVOURITE_COURSES,
    payload: courses,
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.clear();
  setAuthToken(false);
  dispatch(setCurrentUser());
  history.push('/');
};

//Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_FAVOURITE_COURSES:
      return {
        ...state,
        user: { ...state.user, favouriteCourses: action.payload },
      };

    default:
      return state;
  }
};

export default authReducer;
