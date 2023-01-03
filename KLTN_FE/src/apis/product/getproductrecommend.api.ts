import { IProduct } from "../../bussiness/product";
import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnResponse } from "../Response";

interface IProductRecommendParams {
    size: number;
    page?: number;
    search?: string;
}

interface IProductPaging {
    content: IProduct[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
}

const route: ApiRoutes = {
    method: ApiMethods.GET, //GET,DELETE su dung param
    // POST, PUT, PATCH su dung payload
    url: "products/paging",
};
export const getProductRecommendAsync = async (
    payload?: IProductRecommendParams
): Promise<ReturnResponse<IProductPaging>> => {
    return Repository(route, payload);
};
