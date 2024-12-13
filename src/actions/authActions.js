import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProspectOtp, loginAdmin, logoutAdmin } from '../api/authApi';
import { showAlert } from '../slices/alertsSlice';
import { clearToken, setOtp, setToken } from '../slices/authSlice';
import { setCurrentUser } from '../slices/usersSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';
import { getCurrentUser } from './usersActions';

export const login = createAsyncThunk('auth/login', ({ email, password, callback }, { dispatch }) => {
  dispatch(startLoading());

  loginAdmin(email, password)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => {
    dispatch(setToken({ token: data.token }));
    window.localStorage.setItem('token', data.token);
  })
  .then(() => dispatch(getCurrentUser()))
  .then(() => dispatch(showAlert({ message: 'Has iniciado sesión exitosamente', type: 'success' })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const logout = createAsyncThunk('auth/logout', ({ callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  logoutAdmin(token)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(() => {
    dispatch(clearToken());
    window.localStorage.removeItem('token');
  })
  .then(() => dispatch(showAlert({ message: 'Has cerrado sesión exitosamente', type: 'success' })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getProspectOtpCode = createAsyncThunk('auth/getProspectOtpCode', ({ prospect, callback }, { dispatch }) => {
  dispatch(startLoading());

  getProspectOtp(prospect)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setOtp({ otp: data.token })))
  .then(data => dispatch(setCurrentUser({ user: { ...prospect, prospect: true } })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
