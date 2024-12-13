import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: []
}

const employmentsSlice = createSlice({
  name: 'employments',
  initialState,
  reducers: {
    setEmploymentsList: (state, { payload }) => ({ ...state, list: [...payload.employments] }),
    setCurrentEmployment: (state, { payload }) => ({ ...state, current: { ...payload.employment } }),
    resetEmploymentsState: () => ({ list: [], current: { } })
  }
});

export const { setEmploymentsList, setCurrentEmployment, resetEmploymentsState } = employmentsSlice.actions;
export default employmentsSlice.reducer;
