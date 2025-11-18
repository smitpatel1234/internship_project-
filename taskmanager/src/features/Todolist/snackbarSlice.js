import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbarStore",
  initialState: {
    open: false,
    message: "",
    severity: "success",
    autoHideDuration: 2000,
  },
  reducers: {
    showSnackbar: {
      reducer: (state, action) => {
        const { message, severity, autoHideDuration } = action.payload || {};
        state.open = true;
        state.message = message || "";
        state.severity = severity || "success";
        state.autoHideDuration = typeof autoHideDuration === 'number' ? autoHideDuration : 6000;
      },
      prepare: (payload) => {
        if (typeof payload === "string") {
          return { payload: { message: payload, severity: "success", autoHideDuration: 6000 } };
        }
        const { message = "", severity = "success", autoHideDuration = 6000 } = payload || {};
        return { payload: { message, severity, autoHideDuration } };
      },
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = ""; 
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state) => state.snackbarSliceStore || {};
export const selectSnackbarOpen = (state) => (state.snackbarSliceStore || {}).open;
export const selectSnackbarMessage = (state) => (state.snackbarSliceStore || {}).message;
export const selectSnackbarSeverity = (state) => (state.snackbarSliceStore || {}).severity;
export const selectSnackbarAutoHide = (state) => (state.snackbarSliceStore || {}).autoHideDuration;

export default snackbarSlice.reducer;
