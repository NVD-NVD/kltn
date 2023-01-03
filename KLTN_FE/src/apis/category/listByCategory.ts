import axios from "axios";
import { ICategory } from "../../bussiness/category";
import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnResponse } from "../Response";
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
export const getListByCategory = async (
  id: string
  // page: number,
  // size: number,
  // sort: string
): Promise<ReturnResponse<ICategory>> => {
  return thisInstance.get(
    `https://sportswear-be.herokuapp.com/rest/categories/${id}`
    // null
    // {
    //   params: {
    //     page: page,
    //     size: size,
    //     sort: sort,
    //   },
    // }
  );
};
