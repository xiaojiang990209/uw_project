import axios from 'axios';
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

const authorizeUser = (dispatch, res) => {
  const { token } = res.data;
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);

  const { name } = jwt_decode(token);
  dispatch(setCurrentUser(name));
};

export const registerUser = (userRegisterInfo, history) => (dispatch) => {
  return client.session.register(userRegisterInfo).then((res) => {
    authorizeUser(dispatch, res);
    history.push('/dashboard');
  });
};

export const loginUser = (userLoginInfo, history) => (dispatch) => {
  return client.session.login(userLoginInfo).then((res) => {
    authorizeUser(dispatch, res);
    history.push('/dashboard');
  });
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

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  setAuthToken(false);
  dispatch(setCurrentUser());
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
    default:
      return state;
  }
};

export default authReducer;
