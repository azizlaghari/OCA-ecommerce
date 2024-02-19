import store from "..";
import { privateAPI } from "../../config/constants";
import { notification } from "antd";
import { setContactus } from "../slices/contactusSlice";
import { ContactUsType } from "../interfaces/ContactUs";
// import store from "../../store";

export const contactUs = async (values: ContactUsType) => {
  try {
    store.dispatch(setContactus(true));
    let response = await privateAPI.post(`/contact/create`, values);

    if (response?.status === 200) {
      store.dispatch(setContactus(false));
      return response?.data;
    }
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
