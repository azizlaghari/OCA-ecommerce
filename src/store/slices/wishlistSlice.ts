import { createSlice } from "@reduxjs/toolkit";
import { WishlistStateType } from "../interfaces/Wishlist";

const initialState: WishlistStateType = {
  loading: false,
  wishlist: null,
};

export const cartSlice = createSlice({
  name: "wislist",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setWishlist(state, action) {
      state.wishlist = action?.payload;
    },
  },
});

export const { setLoading, setWishlist } = cartSlice.actions;

export default cartSlice.reducer;
