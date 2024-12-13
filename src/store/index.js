import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertsSlice from '../slices/alertsSlice';
import authSlice from '../slices/authSlice';
import loadingSlice from '../slices/loadingSlice';
import errorsSlice from '../slices/errorsSlice';
import usersSlice from '../slices/usersSlice';
import employeesSlice from '../slices/employeesSlice';
import companiesSlice from '../slices/companiesSlice';
import employmentsSlice from '../slices/employmentsSlice';
import bundlesSlice from '../slices/bundlesSlice';
import negativesSlice from '../slices/negativesSlice';
import changesSlice from '../slices/changesSlice';
import notificationsSlice from '../slices/notificationsSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  alerts: alertsSlice,
  loading: loadingSlice,
  errors: errorsSlice,
  users: usersSlice,
  employees: employeesSlice,
  companies: companiesSlice,
  employments: employmentsSlice,
  bundles: bundlesSlice,
  negatives: negativesSlice,
  changes: changesSlice,
  notifications: notificationsSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
