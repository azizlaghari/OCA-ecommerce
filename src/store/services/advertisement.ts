import { notification } from "antd";
import { privateAPI } from "../../config/constants";

export const getBanner = async () => {
  try {
    const response = await privateAPI.get(`/settings/get-landing-banner`);
    return response.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
