import { ApiMethods, ApiRoutes } from "../defineApi"
import Repository from "../RepositoryApi"
const route: ApiRoutes = {
    url: "/orders",
    method: ApiMethods.POST
}
export const createOrderAsync = async (pl: any) => {
    return Repository(route, pl)
}