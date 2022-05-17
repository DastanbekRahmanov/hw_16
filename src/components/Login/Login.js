import React, { useState, useEffect, useReducer } from 'react'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

// const emailReducer = (prevState, action) => {
// 	if (action.type === 'USER_INPUT') {
// 		return {
// 			value: action.emailValue,
// 			isValid: action.emailValue.includes('@'),
// 		}
// 	}
// 	if (action.type === 'INPUT_BLUR') {
// 		return {
// 			value: prevState.value,
// 			isValid: prevState.value.includes('@'),
// 		}
// 	}
// 	return {
// 		value: '',
// 		isValid: false,
// 	}
// }

// const passwordReducer = (prevState, action) => {
// 	if (action.type === 'PASSWORD_INPUT') {
// 		return {
// 			value: action.passwordValue,
// 			isValid: action.passwordValue.trim().length > 6,
// 		}
// 	}
// 	if (action.type === 'PASSWORD_BLUR') {
// 		return {
// 			value: prevState.value,
// 			isValid: prevState.value.trim().length > 6
// 		}
// 	}
// 	return {
// 		value: '',
// 		isValid: false,
// 	}
// }
const emailPasswordReducer= (prevState,action)=>{
  if (action.type === "USER_INPUT") {
    return {
      ...prevState,
      valueOfEmail: action.emailValue,
      isEmailValid: action.emailValue.includes("@"),
    };
  }
  if (action.type === "PASSWORD_INPUT") {
    return {
      ...prevState,
      valueOfPassword: action.passwordValue,
      isPasswordValid: action.passwordValue.trim().length > 6,
    };
  }
  if (action.type === "PASSWORD_BLUR") {
    return {
      ...prevState,
      valueOfPassword: prevState.valueOfPassword,
      isPasswordValid: prevState.valueOfPassword,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      ...prevState,
      valueOfEmail: prevState.valueOfEmail,
      isEmailValid: prevState.valueOfEmail.includes("@"),
    };
  }
  return prevState;
}

//debouncing, debounce
const Login = (props) => {
	// const [emailState, dispatchEmail] = useReducer(emailReducer, {
	// 	isValid: undefined,
	// 	value: '',
	// })
  // const [passwordState, dispatchpassword] = useReducer(passwordReducer, {
	// 	isValid: undefined,
	// 	value: '',
	// })
  const [emailPasswordState,dispatchemailPassword] = useReducer(emailPasswordReducer,{
    isPasswordValid: undefined,
    isEmailValid: undefined,
    valueOfEmail: "",
    valueOfPassword: "",
  })
	// const [enteredEmail, setEnteredEmail] = useState(''); // write some email
	// const [emailIsValid, setEmailIsValid] = useState(); // check is email valid or not
	// const [enteredPassword, setEnteredPassword] = useState('') // write some password
	// const [passwordIsValid, setPasswordIsValid] = useState() // check is password valid or not
	const [formIsValid, setFormIsValid] = useState(false) // email and password are valid
  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
      emailPasswordState.valueOfEmail.includes("@") &&
      emailPasswordState.valueOfPassword.trim().length > 6;
      setFormIsValid(isValid);
    }, 1000);
		// clean up function
		return () => {
			clearTimeout(timer)
		}
	}, [emailPasswordState.valueOfEmail, emailPasswordState.valueOfPassword])
	const emailChangeHandler = (event) => {
		// setEnteredEmail(event.target.value);
		dispatchemailPassword({ type: 'USER_INPUT', emailValue: event.target.value })
	}
	const passwordChangeHandler = (event) => {
		// setEnteredPassword(event.target.value)
    dispatchemailPassword({ type: 'PASSWORD_INPUT', passwordValue: event.target.value })
	}
	const validateEmailHandler = () => {
		// setEmailIsValid(emailState.includes('@'));
		dispatchemailPassword({ type: 'INPUT_BLUR' })
	}
	const validatePasswordHandler = () => {
		// setPasswordIsValid(enteredPassword.trim().length > 6)
    dispatchemailPassword({ type: 'PASSWORD_BLUR' })
	}
	const submitHandler = (event) => {
		event.preventDefault()
		props.onLogin(emailPasswordState)
	}
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailPasswordState.isEmailValid  === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailPasswordState.valueOfEmail}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						emailPasswordState.isPasswordValid  === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={emailPasswordState.valueOfPassword}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}
export default Login
