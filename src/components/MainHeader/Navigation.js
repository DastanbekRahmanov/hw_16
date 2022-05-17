import React, { useContext } from 'react'
import AuthContext from '../../store/auth_context'
import classes from './Navigation.module.css'
import ToggleSwitch from '../ToggleSwitch'

const Navigation = (props) => {
	

	const contextData = useContext(AuthContext)
	return (
		<nav className={classes.nav}>
			<ul>
				{contextData.isLoggedIn && (
					<li>
						<a href='/'>Users</a>
					</li>
				)}
				{contextData.isLoggedIn && (
					<li>
						<a href='/'>Admin</a>
					</li>
				)}
				{contextData.isLoggedIn && (
					<li>
						<button onClick={contextData.onLogout}>Logout</button>
					</li>
				)}
				<ToggleSwitch label="dark mode" />
			</ul>
		</nav>
	)
}

export default Navigation
