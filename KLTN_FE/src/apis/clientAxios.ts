/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
import { notifyError, notifySuccess } from "../utils/notify";
const axiosClient = axios.create({
  baseURL: "https://sportswear-be.herokuapp.com/rest/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(
  (config: any) => {
    // console.log(
    //   `LHA:  ===> file: clientAxios.ts ===> line 18 ===> config`,
    //   config
    // );
    const token = localStorage.getItem("token");
    if (token) config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (err) => {
    console.log(err.response);
    return Promise.reject(err);
  }
);
axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res && res.data)
      return {
        data: res.data,
        statusCode: res.status,
      };
    return res;
  },
  (err) => {
    if (err.response && err.response.data) {
      notifyError(
        err.response.data?.message ||
        err.response.data?.data?.error ||
        "Sorry something went wrong!!"
      );
      return err.response.data;
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
