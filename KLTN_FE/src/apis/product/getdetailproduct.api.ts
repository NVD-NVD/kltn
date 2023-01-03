import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnResponse } from "../Response";

interface payloadGetDetailProduct {
    id: string;
}

export const getDetailProductAsync = async (
    payload: payloadGetDetailProduct
): Promise<ReturnResponse<any>> => {
    return Repository({
        method: ApiMethods.GET,
        url: `products/${payload.id}`,
    });
};
