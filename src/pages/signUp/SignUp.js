import React, { useState, useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import classes from './SignUp.module.css'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isUser, setIsUser] = useState(true)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (email && password && (confirmPass || isUser)) {
      if (password === confirmPass || isUser) {
        // console.log(email, password, confirmPass)
        let url
        if (isUser) {
          url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCk_J2sA7fJF5u5d8b1U5C8nK0VgGaCMB4'
        } else {
          url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCk_J2sA7fJF5u5d8b1U5C8nK0VgGaCMB4'
        }

        try {
          const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (resp.ok) {
            const data = await resp.json()
            localStorage.setItem(
              'details',
              JSON.stringify({ token: data.idToken, email: email })
            )
            dispatch(authActions.login({ token: data.idToken, email }))

            if (!isUser) {
              const mailVerify = await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBUKWtuc6mChahG1mskYlsoKXzaEc-y9ME',
                {
                  requestType: 'VERIFY_EMAIL',
                  idToken: data.idToken,
                }
              )
              // console.log(mailVerify)
              if (mailVerify.status === 200) {
                navigate('/verify')
              }
            } else {
              navigate('/welcome')
            }
            setEmail('')
            setPassword('')
            setConfirmPass('')
          } else {
            let errorMessage = 'Authentication failed'
            const data = await resp.json()
            console.log(data)
            errorMessage = data.error.message
            throw new Error(errorMessage)
          }
        } catch (error) {
          window.alert(error.message)
          console.log(error.message)
        }
      } else {
        setConfirmPass('')
        alert('Please Re-enter Correct Confirm Password')
      }
    } else {
      alert('Please enter all details...')
    }
  }

  const userHandler = (e) => {
    e.preventDefault()
    setIsUser(!isUser)
  }

  return (
    <div>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.formInside}>
          <h2>{isUser ? 'Login' : 'SignUp'}</h2>
          <div className={classes.enterVal}>
            <input
              id='name'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.enterVal}>
            <input
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isUser && (
            <div className={classes.enterVal}>
              <input
                id='confirmPass'
                type='password'
                placeholder='Confirm Password'
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
          )}
          <Link to='/forgot-password'>
            <p>Forgot Password?</p>
          </Link>
          <button type='submit'>Submit</button>
          <button className={classes.btn2} onClick={userHandler}>
            {isUser ? 'SignUp' : 'Have an account ? Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp