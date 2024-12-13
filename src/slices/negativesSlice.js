import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: []
}

const negativesSlice = createSlice({
  name: 'negatives',
  initialState,
  reducers: {
    setNegativesList: (state, { payload }) => ({ ...state, list: [...payload.negatives] }),
    setCurrentNegative: (state, { payload }) => ({ ...state, current: { ...payload.negative } }),
    resetNegativesState: () => ({ list: [], current: { } })
  }
});

export const { setNegativesList, setCurrentNegative, resetNegativesState } = negativesSlice.actions;
export default negativesSlice.reducer;
