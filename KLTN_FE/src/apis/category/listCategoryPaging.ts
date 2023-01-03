import axios from "axios";
import { ICategory } from "../../bussiness/category";
import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnResponse } from "../Response";
const thisInstance = axios.create({
  baseURL: "https://sportswear-be.herokuapp.com/rest/",
  timeout: 20000,
  headers: {
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
export const listCategoryPaging = async (
  page: number,
  size: number,
  sort: string
) => {
  return thisInstance.post(`categories/paging`, null, {
    params: {
      page: page,
      size: size,
      sort: sort,
    },
  });
};
