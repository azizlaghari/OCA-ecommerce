import { createSlice } from "@reduxjs/toolkit";
import { CartStateType } from "../interfaces/Cart";

const initialState: CartStateType = {
  loading: false,
  singleLoading: false,
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSingleLoading(state, action) {
      state.singleLoading = action.payload;
    },
    setCart(state, action) {
      state.cart = action?.payload;
    },
  },
});

export const { setLoading, setCart, setSingleLoading } = cartSlice.actions;

export default cartSlice.reducer;
