import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersList: (state, { payload }) => ({ ...state, list: [...payload.users] }),
    setCurrentUser: (state, { payload }) => ({ ...state, current: { ...payload.user } }),
    resetUsersState: () => ({ list: [], current: { } })
  }
});

export const { setUsersList, setCurrentUser, resetUsersState } = usersSlice.actions;
export default usersSlice.reducer;
