import {IPermissionList, IGetPermissionsAction, GET_PERMISSIONS} from './types';

const InitialState: IPermissionList  = {
    permissionList: []
}

export function permissionReducer(state = InitialState, action: IGetPermissionsAction): IPermissionList {
    switch(action.type){
        case GET_PERMISSIONS:
            return {...state, ...action.payload};
        default:
            return state;
    }
}