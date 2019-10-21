import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const STATE_KEY = 'session';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

//Actions

export const USER_LOADING = 'USER_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_ERRORS = 'GET_ERRORS';

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const { name } = jwt_decode(token);
      dispatch(setCurrentUser(name));
    })
    .catch((err) => {
      console.log(err);
      // dispatch({ type: GET_ERRORS, payload: err.response.data });
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
  dispatch(setCurrentUser({}));
};

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

//Selectors

export default authReducer;
