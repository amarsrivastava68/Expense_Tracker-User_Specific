import React, { useState } from 'react'
import classes from './ForgotPassword.module.css'
import logo from '../../assets/password.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
  const [passEmail, setPassEmail] = useState('')
  const [mailSent, setMailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendLinkHandler = async (e) => {
    e.preventDefault()
    if (passEmail.length === 0) {
      alert('enter valid email...')
      return
    }
    try {
      setIsLoading(true)
      const resp = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCk_J2sA7fJF5u5d8b1U5C8nK0VgGaCMB4',
        {
          requestType: 'PASSWORD_RESET',
          email: passEmail,
        }
      )
      if (resp.status === 200) {
        setMailSent(true)
        setPassEmail('')
      } else {
        alert('Please enter valid email...')
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      window.alert('Please enter valid email...')
      console.log(error.message)
      setPassEmail('')
    }
  }

  return (
    <div className={classes.forgotPassword}>
      <div className={classes.container}>
        <img src={logo} alt='a lock' />
        <div className={classes.enterLink}>
          {isLoading && <h4>Wait a second ! Loading...</h4>}
          {!isLoading && mailSent && (
            <>
            <h3>The Login mail has been sent </h3>
              <Link to='/login'>
                <i> Login here...</i>
              </Link>
              <p className={classes.p1} onClick={() => setMailSent(false)}>
                <i>Send again...</i>
              </p>
            </>
          )}
          {!isLoading && !mailSent && (
            <>
              <label htmlFor='emailSet'>
                Enter the email which you have registered
              </label>
              <input
                id='emailSet'
                type='email'
                placeholder='Email'
                onChange={(e) => setPassEmail(e.target.value)}
              />
              <button onClick={sendLinkHandler}>Send Link</button>
              <p>
                Already a user?
                {
                  <Link to='/login'>
                    <i> Login here</i>
                  </Link>
                }
              </p>
            </>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword