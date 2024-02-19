import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface ThemeState {
  mode: "lightTheme" | "darkTheme" | null | undefined;
}

const storedTheme = localStorage.getItem("theme");

const initialState: ThemeState = {
  mode: (storedTheme as "lightTheme" | "darkTheme") || "darkTheme",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      const themeLocal = localStorage.getItem("theme");
      const newTheme = themeLocal === "lightTheme" ? "darkTheme" : "lightTheme";
      localStorage.setItem("theme", newTheme);
      state.mode = newTheme;
    },
  },
});

export const { toggle } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
