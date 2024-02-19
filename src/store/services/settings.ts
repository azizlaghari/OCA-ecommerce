import store from "..";
import { privateAPI } from "../../config/constants";
import { notification } from "antd";
import { setLoading, setSettings } from "../slices/settingSlice";

export const getSettings = async () => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.get("/settings/get-settings");
    if (response) {
      store.dispatch(setSettings(response?.data?.data));
    }
    return response?.data?.data;
  } catch (error: any) {
    console.log("GET SETTINGS ERROR:", error);
    notification.error({
      message: error?.response?.data?.message || "Server error",
    });
  } finally {
    store.dispatch(setLoading(false));
  }
};
