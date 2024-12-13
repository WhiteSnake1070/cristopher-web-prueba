import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBundle, getBundle, getBundles, updateBundle, uploadBundleImage } from '../api/bundlesApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentBundle, setBundlesList } from '../slices/bundlesSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getBundlesList = createAsyncThunk('bundles/getBundlesList', ({ query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getBundles(token, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setBundlesList({ bundles: data.bundles })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentBundle = createAsyncThunk('bundles/getCurrentBundle', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getBundle(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentBundle({ bundle: data.bundle })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewBundle = createAsyncThunk('bundles/createNewBundle', ({ bundle, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  createBundle(token, bundle)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.bundle))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentBundle = createAsyncThunk('bundles/updateCurrentBundle', ({ id, bundle }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateBundle(token, id, bundle)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentBundle({ bundle: data.bundle })))
  .then(() => dispatch(showAlert({ message: 'Paquete actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const uploadCurrentBundleImage = createAsyncThunk('bundles/uploadCurrentBundleImage', ({ id, image }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  uploadBundleImage(token, id, image)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentBundle({ bundle: data.bundle })))
  .then(() => dispatch(showAlert({ message: 'Paquete actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
