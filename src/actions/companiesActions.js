import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCompany, getCompany, getCompanies, updateCompany } from '../api/companiesApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentCompany, setCompaniesList } from '../slices/companiesSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getCompaniesList = createAsyncThunk('companies/getCompaniesList', ({ query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getCompanies(token, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCompaniesList({ companies: data.companies })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentCompany = createAsyncThunk('companies/getCurrentCompany', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getCompany(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentCompany({ company: data.company })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewCompany = createAsyncThunk('companies/createNewCompany', ({ company, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  createCompany(token, company)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.company))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentCompany = createAsyncThunk('companies/updateCurrentCompany', ({ id, company }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateCompany(token, id, company)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentCompany({ company: data.company })))
  .then(() => dispatch(showAlert({ message: 'Empresa actualizada', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
