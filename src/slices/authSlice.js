import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  otp: null,
  show: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => ({ ...state, token: payload.token }),
    clearToken: (state) => ({ ...state, token: null }),
    setOtp: (state, { payload }) => ({ ...state, otp: payload.otp }),
    openAuth: (state) => ({ ...state, show: true }),
    closeAuth: (state) => ({ ...state, show: false }),
  }
});

export const { setToken, clearToken, setOtp, openAuth, closeAuth } = authSlice.actions;
export default authSlice.reducer;
