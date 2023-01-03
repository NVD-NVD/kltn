import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
import { ReturnResponse } from "../Response";

const getAllUserRoute: ApiRoutes = {
  method: ApiMethods.GET,
  url: "https://sportswear-be.herokuapp.com/rest/users/all",
};

export const getAllUserAsync: any = async () => {
  return Repository(getAllUserRoute);
};
