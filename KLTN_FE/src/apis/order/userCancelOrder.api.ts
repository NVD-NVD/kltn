import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
export const userCancleOrder = async (id: any) => {
  return Repository({
    url: `/orders/${id}`,
    method: ApiMethods.DELETE,
  });
};
