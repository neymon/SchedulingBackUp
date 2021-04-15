import { createStore } from 'redux'
import { loginReducer } from './login/reducers';
import { permissionReducer } from './permissions/reducer';
import { combineReducers } from '@reduxjs/toolkit';

let _combineReducer = combineReducers({
    login: loginReducer,
    permission: permissionReducer
});

export const store = createStore(_combineReducer);

export type RootState = ReturnType<typeof store.getState>;