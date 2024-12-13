import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: []
}

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    setBundlesList: (state, { payload }) => ({ ...state, list: [...payload.bundles] }),
    setCurrentBundle: (state, { payload }) => ({ ...state, current: { ...payload.bundle } }),
    resetBundlesState: () => ({ list: [], current: { } })
  }
});

export const { setBundlesList, setCurrentBundle, resetBundlesState } = bundlesSlice.actions;
export default bundlesSlice.reducer;
