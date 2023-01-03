import { IUser } from "../../bussiness/user";
import { ApiMethods, ApiRoutes } from "../defineApi";
import Repository from "../RepositoryApi";

export const createNewAdminRoute: ApiRoutes = {
  url: "https://sportswear-be.herokuapp.com/rest/users/createNewAdmin",
  method: ApiMethods.POST,
};
export const createNewAdminAsync: any = async (payload: IUser) => {
  console.log("payload", payload);
  return await Repository(createNewAdminRoute, payload);
};
