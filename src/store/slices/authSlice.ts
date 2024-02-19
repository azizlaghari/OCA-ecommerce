import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../store";

import { AuthState } from "../interfaces/Auth";

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const getUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
