import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";

export const getOrderStatus = async () => {
  return Repository({
    url: "enum/order/processing",
    method: ApiMethods.GET,
  });
};
