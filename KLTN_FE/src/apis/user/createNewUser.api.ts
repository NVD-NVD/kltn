import { IUser } from "../../models/auth.model";
import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";
const route: ApiRoutes = {
  url: "/users/create",
  method: ApiMethods.POST,
};

export const createNewUserAsync = async (payload: IUser) => {
  return Repository(route, payload);
};
