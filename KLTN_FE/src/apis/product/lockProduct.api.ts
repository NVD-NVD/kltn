import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

export const lockProductAsync = async (id: string) => {
  const route: ApiRoutes = {
    url: `/products/${id}`,
    method: ApiMethods.DELETE,
  };
  return Repository(route);
};
