import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAsync } from "../../../apis/auths/login.api";
import {
  getAllProductAsync,
  payloadGetAllProduct,
} from "../../../apis/product/getallproduct.api";

export const getAllProductAsyncc = createAsyncThunk(
  "Product/getAllProduct",
  async (payload: payloadGetAllProduct): Promise<any> => {
    const response = await getAllProductAsync(payload);
    return response.data;
  }
);
export type LoginPayload = {
  phone: string;
  password: string;
};
export const getUserToken = createAsyncThunk(
  "user/fetchTokenBySignin",
  async (payload: any, thunkAPI) => {
    const rs: any = await loginAsync(payload);
    const a = rs?.data;
    return { ...a };
  }
);
