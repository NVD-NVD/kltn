import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/notify";
import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

const thisInstance = axios.create({
  baseURL: "https://sportswear-be.herokuapp.com/rest",
  headers: {
    "Content-Type": "application/json",
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
      notifySuccess("Success");
    }
  },
  (err) => {
    if (err.response && err.response.data) {
      notifyError(err.response.data.message);
    }
  }
);
export const editUserAsync = async (payload: any) => {
  console.log(payload);
  return thisInstance.put("/users/admin/update", null, { params: payload });
};
