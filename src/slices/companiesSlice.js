import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: []
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompaniesList: (state, { payload }) => ({ ...state, list: [...payload.companies] }),
    setCurrentCompany: (state, { payload }) => ({ ...state, current: { ...payload.company } }),
    resetCompaniesState: () => ({ list: [], current: { } })
  }
});

export const { setCompaniesList, setCurrentCompany, resetCompaniesState } = companiesSlice.actions;
export default companiesSlice.reducer;
