import { createSlice } from "@reduxjs/toolkit";
import { RewardState } from "../interfaces/Rewards";
const initialState: RewardState = {
  loading: true,
  allRewards: [],
};
export const rewards = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action?.payload;
    },
    setAllRewards(state, action) {
      state.allRewards = action?.payload;
    },
  },
});

export const { setLoading, setAllRewards } = rewards.actions;

export default rewards.reducer;
