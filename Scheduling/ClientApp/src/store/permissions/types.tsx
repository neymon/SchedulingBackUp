import {ILoginAction, ILogoutAction} from "../login/types";

export interface IPermissionList {
    permissionList: string[]
}

export const GET_PERMISSIONS = "GET_PERMISSIONS";

export interface IGetPermissionsAction {
    type: typeof GET_PERMISSIONS,
    payload: IPermissionList
}

export type GetPermissionsType = IGetPermissionsAction;
