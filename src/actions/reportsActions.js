import { createAsyncThunk } from '@reduxjs/toolkit';
import { createReport, getReport, getReports, updateReport } from '../api/reportsApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentReport, setReportsList } from '../slices/reportsSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getReportsList = createAsyncThunk('reports/getReportsList', ({ employmentId, query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getReports(token, employmentId, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setReportsList({ reports: data.reports })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentReport = createAsyncThunk('reports/getCurrentReport', ({ employmentId, id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getReport(token, employmentId, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentReport({ report: data.report })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewReport = createAsyncThunk('reports/createNewReport', ({ employmentId, report, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  createReport(token, employmentId, report)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.report))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentReport = createAsyncThunk('reports/updateCurrentReport', ({ employmentId, id, report }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateReport(token, employmentId, id, report)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentReport({ report: data.report })))
  .then(() => dispatch(showAlert({ message: 'Informe actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
