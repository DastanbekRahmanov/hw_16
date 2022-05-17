import React, { useContext } from 'react'
import AuthContext from '../store/auth_context'
import './ToggleSwitch.css'

const ToggleSwitch = ({ label }) => {

    const done = useContext(AuthContext)

	return (
		<div className='container'>
			{label}
			<div className='toggle-switch'>
				<input
                onClick={() => done.setToggle((prev) => !prev)}
					type='checkbox'
					className='checkbox'
					name={label}
					id={label}
				/>
				<label   className='label' htmlFor={label}>
					<span className='inner' />
					<span className='switch' />
				</label>
			</div>
		</div>
	)
}

export default ToggleSwitch
