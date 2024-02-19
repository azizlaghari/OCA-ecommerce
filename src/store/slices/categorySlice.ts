import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../interfaces/Category";

const initialState: CategoryState = {
  loading: false,
  categories: [],
  categoryFilter: "All",
};

export const productSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCategories(state, action) {
      state.categories = action?.payload;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action?.payload;
    },
  },
});

export const { setLoading, setCategories, setCategoryFilter } =
  productSlice.actions;

export default productSlice.reducer;
