import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import contactusSlice from "./slices/contactusSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import settingSlice from "./slices/settingSlice";
import rewardSlice from "./slices/rewardSlice";
import categorySlice from "./slices/categorySlice";
import reviewSlice from "./slices/reviewSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    products: productSlice,
    contact: contactusSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    settings: settingSlice,
    reward: rewardSlice,
    category: categorySlice,
    review: reviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
