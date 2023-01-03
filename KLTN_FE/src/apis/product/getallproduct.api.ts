import { IProduct } from "../../bussiness/product";
import { loginModel } from "../../models/auth.model";
import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnListResponse } from "../Response";

export interface payloadGetAllProduct {
    size: number;
    page?: number;
    search?: string;
};

const route: ApiRoutes = {
    method: ApiMethods.GET, //GET,DELETE su dung param
    // POST, PUT, PATCH su dung payload
    url: "products/paging",
};
export const getAllProductAsync = async (
    payload: payloadGetAllProduct
): Promise<ReturnListResponse<IProduct[]>> => {
    return Repository(route, payload);
};
