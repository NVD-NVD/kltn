import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";

export const getPaymentStatus = async () => {
  return Repository({
    url: "enum/payment/processing",
    method: ApiMethods.GET,
  });
};
