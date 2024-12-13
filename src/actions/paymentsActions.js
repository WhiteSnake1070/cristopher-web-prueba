import { createAsyncThunk } from '@reduxjs/toolkit';
import { processPayment } from '../api/paymentsApi';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const processNewPayment = createAsyncThunk('payments/processNewPayment', ({ payment, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  processPayment(token, payment)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.payment))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
