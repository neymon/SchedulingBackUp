import { GET_PERMISSIONS, IGetPermissionsAction, IPermissionList } from './types';

export function getPermissions(permissions: IPermissionList): IGetPermissionsAction {
    return {
        type: GET_PERMISSIONS,
        payload: permissions
    }
}