export interface ILoginInfo {
	logined: boolean,
	token: string,
	permissions: string[]
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface ILoginAction {
	type: typeof LOGIN,
	payload: ILoginInfo
}

export interface ILogoutAction {
	type: typeof LOGOUT
}

export interface ILoginActionProps {
	loginAction: (loginInfo: ILoginInfo) => ILoginAction;
}

export type LoginActionType = ILoginAction | ILogoutAction;