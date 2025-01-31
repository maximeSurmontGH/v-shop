import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/store";
import type { Notification } from "@/app/lib/model/notification.model";

export interface NotificationState {
  value: Notification[];
}

const initialState: NotificationState = {
  value: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.value = action.payload;
    },
    toggleNotificationLoading: (
      state,
      action: PayloadAction<{ id: string }>,
    ) => {
      state.value = state.value.map((notification) => {
        if (notification.id === action.payload.id) {
          return { ...notification, loading: !notification.loading };
        } else {
          return notification;
        }
      });
    },
    setNotificationAsRead: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.map((notification) => {
        if (notification.id === action.payload.id) {
          return { ...notification, read: true };
        } else {
          return notification;
        }
      });
    },
  },
});

export const {
  setNotifications,
  toggleNotificationLoading,
  setNotificationAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

const selectNotifications = (state: RootState) => state.notifications.value;

export const selectNotificationsNotRead = createSelector(
  selectNotifications,
  (notifications) => {
    return notifications.filter((notification) => !notification.read);
  },
);
