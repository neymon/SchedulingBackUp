import React from 'react';
import { Link } from 'react-router-dom';
import './error403page.css';

export function Error403page() {
	
	return (
		<div className="error-403-page">
			<h1>Error 403 forbidden</h1>
			<Link to="/">Main page</Link>
		</div>
	)

}