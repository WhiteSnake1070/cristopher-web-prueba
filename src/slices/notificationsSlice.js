import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: [],
  unread: 0
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsList: (state, { payload }) => ({
      ...state,
      list: [...payload.notifications],
      unread: payload.notifications.filter(n => !n.read).length
    }),
    setCurrentNotification: (state, { payload }) => ({ ...state, current: { ...payload.notification } }),
    resetNotificationsState: () => ({ list: [], current: { }, unread: 0 })
  }
});

export const { setNotificationsList, setCurrentNotification, resetNotificationsState } = notificationsSlice.actions;
export default notificationsSlice.reducer;
