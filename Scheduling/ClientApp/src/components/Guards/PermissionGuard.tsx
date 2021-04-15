import React from 'react';
import { Error403page } from '../Erroro403Page/Error403Page';

export default function PermissionGuard(ownedPermissions: string[], requiredPermissions: string[],  elem: JSX.Element): JSX.Element {
	let hasPermission = requiredPermissions.every((elem) => ownedPermissions.includes(elem));


	return hasPermission ? elem : <Error403page></Error403page>;
}
