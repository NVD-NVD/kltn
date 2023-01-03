import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

export const getDetailOrderAsync = async (id: any) => {
  return Repository({
    url: `/orders/${id}`,
    method: ApiMethods.GET,
  });
};
