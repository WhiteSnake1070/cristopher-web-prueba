import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEmployment, getEmployment, getEmployments, updateEmployment } from '../api/employmentsApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentEmployment, setEmploymentsList } from '../slices/employmentsSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getEmploymentsList = createAsyncThunk('employments/getEmploymentsList', ({ query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getEmployments(token, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setEmploymentsList({ employments: data.employments })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentEmployment = createAsyncThunk('employments/getCurrentEmployment', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getEmployment(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentEmployment({ employment: data.employment })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewEmployment = createAsyncThunk('employments/createNewEmployment', ({ employment, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  createEmployment(token, employment)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.employment))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentEmployment = createAsyncThunk('employments/updateCurrentEmployment', ({ id, employment }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateEmployment(token, id, employment)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentEmployment({ employment: data.employment })))
  .then(() => dispatch(showAlert({ message: 'Empleado actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
