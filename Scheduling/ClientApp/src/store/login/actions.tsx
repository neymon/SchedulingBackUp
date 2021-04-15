import { LOGIN, LoginActionType, ILoginInfo, LOGOUT } from './types';

export function login(loginInfo: ILoginInfo): LoginActionType {
	return {
		type: LOGIN,
		payload: loginInfo
	}
}

export function logout(): LoginActionType {
	return {
		type: LOGOUT
	}
}