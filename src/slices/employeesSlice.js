import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeeData: (state, { payload }) => ({ ...state, data: { ...payload.data } }),
    resetEmployeesState: () => ({ data: { } })
  }
});

export const { setEmployeeData, resetEmployeesState } = employeesSlice.actions;
export default employeesSlice.reducer;
