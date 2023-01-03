import axios from "axios";

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
export const editOrderAsync = async (id: any, processing: any) => {
  return thisInstance.put("/orders/processing", null, {
    params: {
      id: id,
      processing: processing,
    },
  });
};
