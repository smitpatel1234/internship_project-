import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const alertSlice = createSlice({
  name: 'alertStore',
  initialState: {
    alerts: [],
  },
  reducers: {
    addAlert: (state, action) => {
      const alert = {
        id: uuidv4(),
        toUserId: action.payload.toUserId,
        fromUserId: action.payload.fromUserId || null,
        message: action.payload.message,
        type: action.payload.type || 'info',
        relatedId: action.payload.relatedId || null,
        read: false,
        createdAt: Date.now(),
      };
      state.alerts.unshift(alert);
    },
    markRead: (state, action) => {
      const id = action.payload;
      const a = state.alerts.find((x) => x.id === id);
      if (a) a.read = true;
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter((a) => a.id !== action.payload);
    },
    markAllRead: (state) => {
      state.alerts.forEach((a) => (a.read = true));
    },
    // mark all alerts for a specific user as read
    markAllReadForUser: (state, action) => {
      const userId = action.payload;
      state.alerts.forEach((a) => {
        if (a.toUserId === userId) a.read = true;
      });
    },
  },
});

export const { addAlert, markRead, removeAlert, markAllRead, markAllReadForUser } = alertSlice.actions;
export default alertSlice.reducer;

export const selectAlertsForUser = (userId) => (state) =>
  state.alertStore.alerts.filter((a) => a.toUserId === userId);

export const selectUnreadCount = (userId) => (state) =>
  state.alertStore.alerts.filter((a) => a.toUserId === userId && !a.read)
    .length;
