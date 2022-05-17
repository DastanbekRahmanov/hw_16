import React, { useState } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'
import AuthContext from './store/auth_context'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [toggle, setToggle] = useState(false)


	
	

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		setIsLoggedIn(true)
	}
	let App = () => <div>I hope</div>
	console.log(App())
	const logoutHandler = () => {
		setIsLoggedIn(false)
	}

	return (
		<React.Fragment>
			<AuthContext.Provider
				value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler,setToggle:setToggle, }}
			>
				<MainHeader />
				<main style={{backgroundColor: !toggle ?   'white' :'black', height:'1000px'}}>
					{!isLoggedIn && <Login onLogin={loginHandler} />}
					{isLoggedIn && <Home onLogout={logoutHandler} />}
				</main>
			</AuthContext.Provider>
		</React.Fragment>
	)
}

export default App
