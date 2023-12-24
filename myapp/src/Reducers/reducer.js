// reducers.js
import { SET_ENTRIES_ALL, SET_ERROR, SET_TODAY_CASES, SET_LOADING, DELETE_ENTRY } from '../Actions/actionTypes';

const initialState = {
  entriesAll: [],
  todayCases: [],   // Add todayCases to your state
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

    case SET_LOADING:
      return { ...state, loading: action.payload }; // Handle SET_LOADING
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
