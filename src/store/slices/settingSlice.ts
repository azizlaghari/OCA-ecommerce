import { createSlice } from "@reduxjs/toolkit";
import { SettingState } from "../interfaces/settings";

const initialState: SettingState = {
  loading: false,
  settings: null,
  orderHistory: [],
  shareHistory: [],
};

export const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setOrderHistory(state, action) {
      state.orderHistory = action?.payload;
    },
    setShareHistory(state, action) {
      state.shareHistory = action?.payload;
    },
    setSettings(state, action) {
      state.settings = action?.payload;
    },
  },
});

export const { setLoading, setOrderHistory, setShareHistory, setSettings } =
  settings.actions;

export default settings.reducer;
