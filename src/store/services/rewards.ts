import store from "../../store";
import { privateAPI } from "../../config/constants";
import { notification } from "antd";
import { ShareRewardsType } from "../interfaces/Rewards";
import { getUser } from "./auth";
import { setShareHistory } from "../slices/settingSlice";
import { setAllRewards, setLoading } from "../slices/rewardSlice";

const handleError = (error: any) => {
  notification.error({
    message: error?.response?.data?.message || "Server Error",
  });
};

export const shareRewards = async (payload: ShareRewardsType) => {
  try {
    const response = await privateAPI.post("/rewards/share-rewared", payload);
    if (response) {
      notification.success({
        message: response?.data?.data?.message || "Rewards share successfully.",
      });
      await getUser();
    }
    return response;
  } catch (error: any) {
    handleError(error);
  }
};
export const buyReward = async (id: string) => {
  try {
    const response = await privateAPI.post("/rewards/buy", { _id: id });
    if (response) {
      notification.success({
        message: response?.data?.data?.message,
      });
      await getUser();
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const getReward = async () => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.get("/rewards/get-all");
    if (response) {
      store.dispatch(setAllRewards(response?.data?.data));
      return response?.data?.data;
    }
  } catch (error: any) {
    handleError(error);
  } finally {
    store.dispatch(setLoading(false));
  }
};

export const getShareHistory = async () => {
  try {
    const response = await privateAPI.get("/rewards/share-history");
    if (response) {
      store.dispatch(setShareHistory(response?.data?.data));
      return response?.data?.data;
    }
  } catch (e) {
    console.log({ e });
  }
};
