// reducers.js
import { SET_ENTRIES_ALL, SET_ERROR, SET_TODAY_CASES, SET_LOADING, DELETE_ENTRY, SET_ROLES, POST_ROLE_SUCCESS, FETCH_USER_SUCCESS, UPDATE_USER_SUCCESS } from '../Actions/actionTypes';

const initialState = {
  entriesAll: [],
  todayCases: [],   // Add todayCases to your state
  roles: [],
  postedRole: null,
  currentUser: {},
  loading: false,   // Add loading to your state
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRIES_ALL:
      return { ...state, entriesAll: action.payload };
    case SET_TODAY_CASES:
      return { ...state, todayCases: action.payload }; // Handle SET_TODAY_CASES
    case DELETE_ENTRY:
      const updatedEntries = state.entriesAll.filter(entry => entry._id !== action.payload);
      return { ...state, entriesAll: updatedEntries };

    case SET_ROLES:
      return { ...state, roles: action.payload };

    case POST_ROLE_SUCCESS:
      return { ...state, postedRole: action.payload };

    case FETCH_USER_SUCCESS:
      return { ...state, currentUser: action.payload };
    case UPDATE_USER_SUCCESS:
      // Update the user data in your state as needed
      return { ...state, currentUser: { ...state.currentUser, ...action.payload } };

    case SET_LOADING:
      return { ...state, loading: action.payload }; // Handle SET_LOADING
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
