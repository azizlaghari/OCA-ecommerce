import Axios from "axios";
// import { getToken } from "../utils";

// export const base_url = "http://192.168.100.12:9000";
// export const base_url = "http://192.168.33.201:9000";
export const base_url = "https://oca-backend-new-production.up.railway.app/";

export const publicAPI = Axios.create({ baseURL: base_url });

// export const privateAPI = Axios.create({ baseURL: base_url });

// const jwt = getToken();
export const privateAPI = Axios.create({
  baseURL: base_url,
  headers: {
    common: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  },
});

// export const attachToken = async () => {
//   const jwt = localStorage.getItem("token");
//   privateAPI.defaults.headers.common.Authorization = `Bearer ${jwt}`;
// };

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).{8,}$/;

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// export const constantCategories = {
//   celebrations: "659fa7c74471c3f1ca4689ef",
//   experiences: "659fa8194471c3f1ca4689fe",
//   specialPrograms: "659fa87a4471c3f1ca468a07",
// };
