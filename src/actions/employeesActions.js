import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployeeByIdentityNumber, getEmployeeByIdentityNumberAndPin } from '../api/employeesApi';
import { setEmployeeData } from '../slices/employeesSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';
import { getCurrentUser } from './usersActions';

export const getCurrentEmployee = createAsyncThunk('employees/getCurrentEmployee', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getEmployeeByIdentityNumber(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setEmployeeData({ data: data.data })))
  .then(() => dispatch(getCurrentUser()))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentEmployeeWithPin = createAsyncThunk('employees/getCurrentEmployeeWithPin', ({ id, pin, callback }, { getState, dispatch }) => {
  const { otp } = getState().auth;

  dispatch(startLoading());

  getEmployeeByIdentityNumberAndPin(otp, id, pin)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setEmployeeData({ data: data.data })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
