import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
export const lockOrderAsync = async (id: any) => {
  return Repository({
    url: `/orders/${id}`,
    method: ApiMethods.PUT,
  });
};
