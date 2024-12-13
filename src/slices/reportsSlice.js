import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: { },
  list: []
}

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportsList: (state, { payload }) => ({ ...state, list: [...payload.reports] }),
    setCurrentReport: (state, { payload }) => ({ ...state, current: { ...payload.report } }),
    resetReportsState: () => ({ list: [], current: { } })
  }
});

export const { setReportsList, setCurrentReport, resetReportsState } = reportsSlice.actions;
export default reportsSlice.reducer;
