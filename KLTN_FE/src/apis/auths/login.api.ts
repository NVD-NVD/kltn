import { loginModel } from '../../models/auth.model';
import { ApiMethods, ApiRoutes } from '../defineApi';
import Repository from '../RepositoryApi';
import { ReturnResponse } from '../Response';

export interface payloadlogin {
	phone: string;
	password: string;
}
const route: ApiRoutes = {
	method: ApiMethods.POST, //GET,DELETE su dung param
	// POST, PUT, PATCH su dung payload
	url: 'https://sportswear-be.herokuapp.com/rest/auth/login', 
};
export const loginAsync = async (
	payload: payloadlogin
): Promise<ReturnResponse<loginModel>> => {
	console.log('alo', payload.phone);
	return Repository(route, payload);
};
