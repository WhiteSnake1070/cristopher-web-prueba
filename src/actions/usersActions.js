import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, getUser, updateUser, changeUserPassword } from '../api/usersApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentUser } from '../slices/usersSlice';
import { setToken } from '../slices/authSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getCurrentUser = createAsyncThunk('users/getCurrentUser', (_, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getUser(token)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentUser({ user: data.user })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewUser = createAsyncThunk('users/createNewUser', ({ user, callback }, { dispatch }) => {
  dispatch(startLoading());

  createUser(user)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setToken({ token: data.token })))
  .then(() => dispatch(showAlert({ message: 'Cuenta creada exitosamente', type: 'success' })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentUser = createAsyncThunk('users/updateCurrentUser', ({ user }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateUser(token, user)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentUser({ user: data.user })))
  .then(() => dispatch(showAlert({ message: 'Usuario actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const resetCurrentUserPassword = createAsyncThunk('users/resetCurrentUserPassword', ({ currentPassword, newPassword }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  changeUserPassword(token, currentPassword, newPassword)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(() => dispatch(showAlert({ message: 'Contraseña cambiada', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
