import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {CookiesProvider, useCookies} from "react-cookie";

import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import PlaningPage from './components/PlaningPage/PlaningPage';
import CalendarPage from './components/CalendarPage/CalendarPage';
import VacationPage from './components/VacationPage/VacationPage';
import PermissionsPage from './components/PermissionsPage/PermissionsPage';
import ReportingPage from './components/ReportingPage/ReportingPage';
import VacationApprovingPage from './components/VacationApprovingPage/VacationApprovingPage';
import TimerPage from './components/TimerPage/TimerPage';

import NavBar from './components/NavBar/NavBar';

import PermissionGuard from './components/Guards/PermissionGuard';
import AuthGuard from './components/Guards/AuthGuard';


import { LoginActionType } from './store/login/types';
import { logout } from './store/login/actions';
import {GetPermissionsType, IPermissionList} from "./store/permissions/types";
import {getPermissions} from "./store/permissions/actions";
import { RootState, store} from './store/configureStore';
import getPermissionsAPI from "./webAPI/permissions/permissionsAPI";

import './custom.css'
import {useEffect} from "react";
import {render} from "react-dom";

interface IAppProps {
    permissions: string[],
    logined: boolean,
    logout: () => LoginActionType,
    getPermissions: (permissionsList: IPermissionList) => GetPermissionsType,
    token: string
}

const App: FunctionComponent<IAppProps> = (props: IAppProps) => {
    const [token, setToken, removeToken] = useCookies(['token']);

    useEffect(() => {
        if(props.logined) {
            let permissionList: IPermissionList = {permissionList: []};
            getPermissionsAPI(props.token).then((res: IPermissionList) => permissionList = res);
            props.getPermissions(permissionList);
        }
    }, [props.logined]);




    let logoutBtn = null;

    if(props.logined){
        logoutBtn = <button type='button' onClick={() => {
            removeToken('token');
            props.logout();
        }}>logout</button>;
    }

    return (
        <CookiesProvider>
            <div className="app">
                <header>
                    <h1>Scheduling</h1>
                    {logoutBtn}
                </header>
                <main>
                    <NavBar></NavBar>
                    <Switch>
                        <Route path='/login' component={LoginPage} />
                        <Route path='/timer'>
                            {AuthGuard(props.logined, <TimerPage></TimerPage>)}
                        </Route>
                        <Route path='/planing'>
                            {AuthGuard(props.logined, <PlaningPage></PlaningPage>)}
                        </Route>
                        <Route path='/calendar'>
                            {AuthGuard(props.logined, PermissionGuard(props.permissions, ["canManageUsers"], <CalendarPage></CalendarPage>))}
                        </Route>
                        <Route path='/permissions'>
                            {AuthGuard(props.logined, PermissionGuard(props.permissions, ["canManageUsers"], <PermissionsPage></PermissionsPage>))}
                        </Route>
                        <Route path='/reporting'>
                            {AuthGuard(props.logined, PermissionGuard(props.permissions, ["canManageUsers"], <ReportingPage></ReportingPage>))}
                        </Route>
                        <Route path='/vacationApproving'>
                            {AuthGuard(props.logined, PermissionGuard(props.permissions, ["canManageUsers"], <VacationApprovingPage></VacationApprovingPage>))}
                        </Route>
                        <Route path='/vacation'>
                            {AuthGuard(props.logined, <VacationPage></VacationPage>)}
                        </Route>
                        <Route path='/'>
                            {AuthGuard(props.logined, <MainPage></MainPage>)}
                        </Route>
                    </Switch>
                </main>
            </div>
        </CookiesProvider>
    );
};

const mapStateToProps = (store: RootState) => {
    return {
        permissions: store.permission.permissionList,
        logined: store.login.logined,
        token: store.login.token
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        logout: () => dispatch(logout()),
        getPermissions: (permissionsList: IPermissionList) => dispatch(getPermissions(permissionsList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);