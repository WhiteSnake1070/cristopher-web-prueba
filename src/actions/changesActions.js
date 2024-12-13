import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChange, getChanges } from '../api/changesApi';
import { setCurrentChange, setChangesList } from '../slices/changesSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getChangesList = createAsyncThunk('changes/getChangesList', ({ query, employeeId }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getChanges(token, employeeId, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setChangesList({ changes: data.changes })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentChange = createAsyncThunk('changes/getCurrentChange', ({ employeeId, changeId }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getChange(token, employeeId, changeId)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentChange({ change: data.change })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
