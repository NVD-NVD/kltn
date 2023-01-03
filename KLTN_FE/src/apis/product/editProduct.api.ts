import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/notify";
export const editProduct = async (payload: any, id_payload: any) => {
  console.log(payload)
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
        notifySuccess("Sửa thành công");
      }
    },
    (err) => {
      if (err.response && err.response.data) {
        notifyError(err.response.data.message);
      }
    }
  );
  try {
    return await thisInstance.put(`/products/${id_payload}`, payload);
  } catch (err: any) {
    notifyError(err.message);
    console.log(err);
  }
};
