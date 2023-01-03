import { IUser } from '../../models/auth.model';
import { ApiMethods, ApiRoutes } from '../defineApi';
import Repository from '../RepositoryApi';
import { ReturnResponse } from '../Response';

const route: ApiRoutes = {
	method: ApiMethods.GET, //GET,DELETE su dung param
	// POST, PUT, PATCH su dung payload
	url: 'https://sportswear-be.herokuapp.com/rest/users',
};
export const getInfoAsync = async (): Promise<ReturnResponse<IUser>> => {
	return Repository(route);
};
