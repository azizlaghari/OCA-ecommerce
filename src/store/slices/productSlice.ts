import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  singleProduct: {},
  loading: false,
  search: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setProduct(state, action) {
      state.products = action?.payload;
    },
    setSingleProduct(state, action) {
      state.singleProduct = action?.payload;
    },
    setCategories(state, action) {
      state.categories = action?.payload;
    },
    setGlobalSearch(state, action) {
      state.search = action?.payload;
    },
  },
});

export const {
  setLoading,
  setProduct,
  setSingleProduct,
  setCategories,
  setGlobalSearch,
} = productSlice.actions;

export default productSlice.reducer;
