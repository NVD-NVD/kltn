import { IBook } from "../../bussiness/product";
import { ICartProduct } from "../../utils/localStorage";
import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnListResponse } from "../Response";

interface IPayload {
    cardDetail: any[],
}

export const checkoutCart = async (
    userId: string,
    payload: IPayload,
): Promise<ReturnListResponse<IBook[]>> => {
    return Repository({
        method: ApiMethods.POST,
        url: `order/${userId}`
    }, payload);
};
