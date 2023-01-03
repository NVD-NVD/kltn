import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProductAsync,
  payloadGetAllProduct,
} from "../../../apis/product/getallproduct.api";
import { getDetailProductAsync } from "../../../apis/product/getdetailproduct.api";

export const getAllProductAsyncc = createAsyncThunk(
  "Product/getAllProduct",
  async (payload: payloadGetAllProduct): Promise<any> => {
    const response = await getAllProductAsync(payload);
    return response;
  }
);

export const getDetailProductAsyncc = createAsyncThunk(
  "Product/getDetailProduct",
  async (payload: { id: string }): Promise<any> => {
    const response = await getDetailProductAsync(payload);
    return response;
  }
);
