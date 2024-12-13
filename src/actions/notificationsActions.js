import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNotification, getNotifications, readNotification } from '../api/notificationsApi';
import { setCurrentNotification, setNotificationsList } from '../slices/notificationsSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getNotificationsList = createAsyncThunk('notifications/getNotificationsList', ({ query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getNotifications(token, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setNotificationsList({ notifications: data.notifications })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentNotification = createAsyncThunk('notifications/getCurrentNotification', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getNotification(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentNotification({ notification: data.notification })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const readCurrentNotification = createAsyncThunk('notifications/readCurrentNotification', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  readNotification(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentNotification({ notification: data.notification })))
  .then(() => dispatch(getNotificationsList({ query: {} })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
