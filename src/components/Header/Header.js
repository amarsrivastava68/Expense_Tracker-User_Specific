import React from 'react'
import classes from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authSlice'
import { themeActions } from '../../store/themeSlice'

const Header = () => {

  
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { isDarkTheme } = useSelector((state) => state.theme)
  const navigate = useNavigate()

  const logoutHandler = (e) => {
    e.preventDefault()

    dispatch(authActions.logout())
    navigate('/login', { replace: true })
  }

  return (
    <>
     <button
      onClick={() => dispatch(themeActions.toggleTheme())}
        className={classes.themeD}
      >
        {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
      </button>
      <header className={classes.header}>
        <ul className={classes.navList}>
          <Link to='/welcome' activeClassName={classes.active}>
            <li>HOME</li>
          </Link>
          <Link to='/expenses' activeClassName={classes.active}>
            <li>EXPENSES</li>
          </Link>
          <Link to='/updateProfile' activeClassName={classes.active}>
            <li>PROFILE</li>
          </Link>
          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </ul>
      </header>
    </>
  )
}

export default Header