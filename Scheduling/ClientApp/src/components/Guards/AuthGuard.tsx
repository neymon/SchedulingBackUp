import React from 'react';
import { Redirect } from 'react-router';

export default function PrivateRoute(logined: boolean, elem: JSX.Element){
	if(logined){
		return elem;
	}
	return <Redirect to="/login"></Redirect>;
}
