import { ILoginInfo, LOGIN, LoginActionType, LOGOUT } from './types';
import {useCookies} from "react-cookie";

const InitialState: ILoginInfo  = {
	logined: false,
	token: '',
	permissions: []
}

export function loginReducer(state = InitialState, action: LoginActionType): ILoginInfo {
	switch(action.type){
		case LOGIN:
			return {...state, ...action.payload};
		case LOGOUT:
			return {...state, ...{logined: false, token: '', permissions: []}};
		default: 
			return state;
	}
}