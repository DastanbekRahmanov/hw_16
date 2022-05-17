import React from 'react'

const AuthContext = React.createContext({
	setToggle: false,
	isLoggedIn: false,
	onLogout: () => {},
})

export default AuthContext
