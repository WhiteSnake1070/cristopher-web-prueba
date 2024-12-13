import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: []
}

const changesSlice = createSlice({
  name: 'changes',
  initialState,
  reducers: {
    setChangesList: (state, { payload }) => ({ ...state, list: [...payload.changes] }),
    setCurrentChange: (state, { payload }) => ({ ...state, current: { ...payload.change } }),
    resetChangesState: () => ({ list: [], current: { } })
  }
});

export const { setChangesList, setCurrentChange, resetChangesState } = changesSlice.actions;
export default changesSlice.reducer;
