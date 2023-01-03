import axios from "axios";
import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

const thisInstance = axios.create({
  baseURL: "https://sportswear-be.herokuapp.com/rest",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
thisInstance.interceptors.request.use((config: any) => {
  let token = localStorage.getItem("token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }
});
export const createPaymentAsync = async (payload: any) => {
  return thisInstance.post("/payments", null, {
    params: { orderID: payload.orderID, url_return: payload.url_return },
  });
};
