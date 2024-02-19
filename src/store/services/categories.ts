import store from "..";
import { privateAPI } from "../../config/constants";
import { notification } from "antd";
import { setCategories, setLoading } from "../slices/categorySlice";

export const getAllCategories = async () => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.post(`/category/get`);
    if (response) {
      store.dispatch(setCategories(response.data.data));
    }
    return response.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  } finally {
    store.dispatch(setLoading(false));
  }
};

export const getCategory = async (payload: { type: string }) => {
  try {
    const response = await privateAPI.post(`/category/get`, payload);
    return response.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
