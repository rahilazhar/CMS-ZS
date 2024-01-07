// actions.js
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


import { SET_ENTRIES_ALL, SET_ERROR, SET_TODAY_CASES, SET_LOADING, DELETE_ENTRY, SET_ROLES, POST_ROLE_SUCCESS, FETCH_USER_SUCCESS, UPDATE_USER_SUCCESS, GET_ALL_PENDING_REQUEST } from './actionTypes';

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

export const setRoles = (data) => ({
  type: SET_ROLES,
  payload: data,
});

export const postRoleSuccess = (roleData) => ({
  type: POST_ROLE_SUCCESS,
  payload: roleData,
});

export const fetchUserSuccess = (userData) => ({
  type: FETCH_USER_SUCCESS,
  payload: userData,
});

export const updateUserSuccess = (userData) => ({
  type: UPDATE_USER_SUCCESS,
  payload: userData,
});


export const getallpendingrequests = (userData) => ({
  type: GET_ALL_PENDING_REQUEST,
  payload: userData,
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


export const fetchRoles = (urlapi) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlapi}/api/v1/auth/getrole`);
    if (response.data.length > 0) {
      dispatch(setRoles(response.data[0].role)); // Assuming the roles are in the first object of the array
    }
  } catch (error) {
    dispatch(setError(error));
  }
};


export const postRole = (roleData, urlapi) => async (dispatch) => {
  try {
    const response = await axios.post(`${urlapi}/api/v1/auth/addrole`, roleData);
    dispatch(postRoleSuccess(response.data)); // Assuming you want to store the response in the Redux store
    alert('Role added successfully'); // Or handle success in a more sophisticated way
  } catch (error) {
    dispatch(setError(error));
    alert('Failed to add role'); // Or display the error message from the server
  }
};


export const fetchUser = (id, urlapi) => async (dispatch) => {
  try {
    const response = await fetch(`${urlapi}/api/v1/auth/getallusers/${id}`);
    const data = await response.json();
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const updateUser = (id, formData, urlapi, setIsLoading) => async (dispatch) => {
  try {
    setIsLoading(true)
    const response = await fetch(`${urlapi}/api/v1/auth/editusers/${id}`, {
      method: 'put',
      body: formData,
    });
    const data = await response.json();
    dispatch(updateUserSuccess(data));
    setIsLoading(false)
    toast.success(data.Message);

  } catch (error) {
    dispatch(setError(error));
    toast.error('An error occurred during the update');
  }
};

export const pendingrequests = (urlapi) => async (dispatch) => {
  try {
 
    const response = await fetch(`${urlapi}/api/v1/auth/pendingrequests`)
    const data = await response.json();
    dispatch(getallpendingrequests(data));
  } catch (error) {
    dispatch(setError(error));
    toast.error('An error occurred during the Fetching');
  }
}
