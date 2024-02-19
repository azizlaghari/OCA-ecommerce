import { createSlice } from "@reduxjs/toolkit";
import { ReviewState } from "../interfaces/Review";

const initialState: ReviewState = {
  isLoading: true,
  reviews: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { setReviews, setLoading } = reviewSlice.actions;

export default reviewSlice.reducer;
