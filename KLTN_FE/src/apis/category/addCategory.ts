import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "../../stores/store";
import { notifyError, notifySuccess } from "../../utils/notify";
import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";

const token = localStorage.getItem("token");
const thisInstance = axios.create({
  baseURL: "https://sportswear-be.herokuapp.com/rest/",
  timeout: 20000,
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
export const addCategory = async (t: string) => {
  return thisInstance.post(
    "https://sportswear-be.herokuapp.com/rest/categories",
    null,
    { params: { title: t } }
  );
};
