import { createSlice } from "@reduxjs/toolkit";

// import { ProductType } from "../interfaces/Product";

const initialState = {
    singleProduct: {},
    loading: false,
    ContactUs: {}
}

export const contactusSlice = createSlice({
    name: "contactus",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        setContactus(state, action) {
            state.ContactUs = action?.payload
        },

    }
});

export const { setLoading, setContactus } = contactusSlice.actions;

export default contactusSlice.reducer;
