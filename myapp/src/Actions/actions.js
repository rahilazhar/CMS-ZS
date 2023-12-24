// actions.js
import axios from 'axios';
import { SET_ENTRIES_ALL, SET_ERROR , SET_TODAY_CASES, SET_LOADING  , DELETE_ENTRY} from './actionTypes';

export const setEntriesAll = (data) => ({
  type: SET_ENTRIES_ALL,
  payload: data,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setTodayCases = (data) => ({
  type: SET_TODAY_CASES,
  payload: data,
});

export const deleteEntrySuccess = (id) => ({
  type: DELETE_ENTRY,
  payload: id,
});

export const fetchEntries = (urlapi) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlapi}/api/v1/auth/getentries`);
    dispatch(setEntriesAll(response.data));
  } catch (error) {
    dispatch(setError(error));
  }
};



export const fetchTodayCases = (urlapi) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${urlapi}/api/v1/auth/gettodayentries`);
    dispatch(setTodayCases(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};


export const deleteEntry = (id, urlapi) => async (dispatch) => {
  try {
    const response = await axios.delete(`${urlapi}/api/v1/auth/deleteentries/${id}`);
    if (response.status === 200) {
      dispatch(deleteEntrySuccess(id));
      alert(response.data.Message); // Or handle the user feedback more sophisticatedly
    }
  } catch (error) {
    console.error('Error deleting the case: ', error);
    alert('Failed to delete the case'); // Or display the error message from the server
  }
};
