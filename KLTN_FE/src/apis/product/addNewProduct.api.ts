import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/notify";
export const addNewProductAsync = async (payload: any) => {
  const thisInstance = axios.create({
    baseURL: "https://sportswear-be.herokuapp.com/rest/",
    timeout: 20000,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
  thisInstance.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      console.log(err.response);
      return Promise.reject(err);
    }
  );
  thisInstance.interceptors.response.use(
    (res) => {
      if (res && res.data) {
        notifySuccess("Thêm thành công");
      }
    },
    (err) => {
      if (err.response && err.response.data) {
        notifyError(err.response.data.message);
      }
    }
  );
  try {
    return await thisInstance.post("/products", payload);
  } catch (err: any) {
    notifyError(err.message);
    console.log(err);
  }
};
