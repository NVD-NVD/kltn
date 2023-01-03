import { IProduct } from "../../bussiness/product";
import { ICategoryName } from "../../bussiness/category";
import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnListResponse } from "../Response";

const route: ApiRoutes = {
    method: ApiMethods.GET, //GET,DELETE su dung param
    // POST, PUT, PATCH su dung payload
    url: "https://sportswear-be.herokuapp.com/rest/categories/all",
};
export const getListCategoryName = async (): Promise<ReturnListResponse<ICategoryName>> => {
    return Repository(route);
};
