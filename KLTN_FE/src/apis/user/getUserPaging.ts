import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

const route: ApiRoutes = {
  url: "https://sportswear-be.herokuapp.com/rest/users/paging",
  method: ApiMethods.GET,
};
export const getUserPagingAsync = async (page: number, pageSize: number) => {
  const payload = {
    page: page,
    size: pageSize,
    sort: "asc",
  };
  return Repository(route, payload);
};
