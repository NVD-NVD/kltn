import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

export const getOrderByUserID = async () => {
  return Repository({
    url: `/orders`,
    method: ApiMethods.GET,
  });
};
