import store from "..";
import { privateAPI } from "../../config/constants";
import { notification } from "antd";
import { setLoading, setReviews } from "../slices/reviewSlice";

export const getReviews = async () => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.get("/reviews/get-all");
    if (response) {
      store.dispatch(setReviews(response?.data?.data));
    }
    return response?.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
      duration: 3,
    });
  } finally {
    store.dispatch(setLoading(false));
  }
};
