import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/configureStore';

import './navBar.css';
import {Error403page} from "../Erroro403Page/Error403Page";

interface INavLink {
	name: string,
	link: string,
	requiredPermissions: string[]
}

interface INavBarProps {
	permissions: string[],
	logined: boolean
}

const navLinks: INavLink[] = [
{
	name: "Main",
	link: '/',
	requiredPermissions: []
},
{
	name: "Timer",
	link: '/timer',
	requiredPermissions: ["isPartTime"]
},
{
	name: "Calendar",
	link: "/calendar",
	requiredPermissions: []
},
{
	name: "Vacation approving",
	link: "/vacationApproving",
	requiredPermissions: ["canManageUsers"]
},
{
	name: "Reporting",
	link: "/reporting",
	requiredPermissions: ["canManageUsers"]
},
{
	name: "Permissions",
	link: "/permissions",
	requiredPermissions: ["canManageUsers"]
},
{
	name: "Vacation",
	link: "/vacation",
	requiredPermissions: []
}
];

function NavBar(props: INavBarProps) {
	if(!props.logined){
		return null;
	}

	return <nav><ul>{
		navLinks.map((link: INavLink, index: number) => {
			let hasPermission = link.requiredPermissions.every((elem) => props.permissions.includes(elem))
			return hasPermission ? <li key={index}><Link to={link.link}>{link.name}</Link></li> : null;
		})
	}</ul></nav>;
}

const mapStateToProps = (store: RootState) => {
	return {
		logined: store.login.logined,
		permissions: store.login.permissions
	}
}

export default connect(mapStateToProps)(NavBar);