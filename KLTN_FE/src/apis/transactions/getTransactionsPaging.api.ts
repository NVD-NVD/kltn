import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";

export const getTransactionPaging = async () => {
  return Repository({ url: "transactions", method: ApiMethods.GET });
};
