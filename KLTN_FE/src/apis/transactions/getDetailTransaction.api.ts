import { ApiMethods } from "../defineApi";
import Repository from "../RepositoryApi";

export const getDetailTransaction = async (id: any) => {
  return Repository({ url: `transactions/${id}`, method: ApiMethods.GET });
};
