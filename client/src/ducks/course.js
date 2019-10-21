import axios from 'axios';

const initialState = {
  ratingsMap: {},
  descriptions: {},
};

export const SET_PROF_RATING = 'SET_PROF_RATING';
export const SET_COURSE_DESCRIPTION = 'SET_COURSE_DESCRIPTION';

export const STATE_KEY = 'course';

export const getCourseSchedule = (term, subject) => (dispatch) => {
  return axios.get(`/api/schedule/${term}/${subject}`);
};

export const getCourseDescription = (course) => (dispatch) => {
  // Set the corresponding course to null first before actually
  // fetching it so that axios requests don't cram the network
  dispatch(setCourseDescription(course, null));
  const [subject, number] = course.split(' ');
  return axios
    .get(`/api/schedule/detail/${subject}/${number}`)
    .then((res) => dispatch(setCourseDescription(course, res.data)))
    .catch((err) => console.log(err));
};

export const getProfRating = (name) => (dispatch) => {
  dispatch(setProfRating(name, null));
  return axios
    .get(`/api/rating/${name}`)
    .then((res) => dispatch(setProfRating(name, res.data)))
    .catch((err) => console.log(err));
};

const setProfRating = (name, rating) => {
  return {
    type: SET_PROF_RATING,
    payload: { name, rating },
  };
};

const setCourseDescription = (course, description) => {
  return {
    type: SET_COURSE_DESCRIPTION,
    payload: { course, description },
  };
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROF_RATING:
      return {
        ...state,
        ratingsMap: {
          ...state.ratingsMap,
          [action.payload.name]: action.payload.rating,
        },
      };
    case SET_COURSE_DESCRIPTION:
      return {
        ...state,
        descriptions: {
          ...state.descriptions,
          [action.payload.course]: action.payload.description,
        },
      };

    default:
      return state;
  }
};

//selectors

export default courseReducer;
