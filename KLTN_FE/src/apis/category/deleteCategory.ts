import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/notify";
import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";

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
      notifySuccess("Xoá thành công");
    }
  },
  (err) => {
    if (err.response && err.response.data) {
      notifyError(err.response.data.message);
    }
  }
);
export const deleteCategory = async (id_payload: string) => {
  return thisInstance.delete(
    `https://sportswear-be.herokuapp.com/rest/categories/`,
    { params: { id: id_payload } }

  );
  // return Repository({ url: 'https://sportswear-be.herokuapp.com/rest/categories/', method: ApiMethods.DELETE }, { id_payload })
};
