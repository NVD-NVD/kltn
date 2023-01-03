import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnResponse } from "../Response";

interface payloadUpdateCart {
  id: string;
  quantity: number;
}
const route: ApiRoutes = {
  method: ApiMethods.PUT, //GET,DELETE su dung param
  // POST, PUT, PATCH su dung payload
  url: "cart/updateCart",
};
export const updateCartAsync = async (
  payload: payloadUpdateCart
): Promise<ReturnResponse<any>> => {
  return Repository(route, payload);
};
