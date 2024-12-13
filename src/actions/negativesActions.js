import { createAsyncThunk } from '@reduxjs/toolkit';
import { createNegative, getNegative, getNegatives, updateNegative } from '../api/negativesApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentNegative, setNegativesList } from '../slices/negativesSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getNegativesList = createAsyncThunk('negatives/getNegativesList', ({ query, employeeId }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getNegatives(token, employeeId, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setNegativesList({ negatives: data.negatives })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentNegative = createAsyncThunk('negatives/getCurrentNegative', ({ employeeId, negativeId }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getNegative(token, employeeId, negativeId)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentNegative({ negative: data.negative })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewNegative = createAsyncThunk('negatives/createNewNegative', ({ negative, employeeId, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  createNegative(token, employeeId, negative)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.negative))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentNegative = createAsyncThunk('negatives/updateCurrentNegative', ({ employeeId, negativeId, negative }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateNegative(token, employeeId, negativeId, negative)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentNegative({ negative: data.negative })))
  .then(() => dispatch(showAlert({ message: 'Empleado actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
