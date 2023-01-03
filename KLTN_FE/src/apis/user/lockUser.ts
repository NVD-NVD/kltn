import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

export const lockUserAsync = async (id: string) => {
  const route: ApiRoutes = {
    url: `https://sportswear-be.herokuapp.com/rest/users/${id}`,
    method: ApiMethods.DELETE,
  };
  const payload = {};
  return Repository(route);
};
