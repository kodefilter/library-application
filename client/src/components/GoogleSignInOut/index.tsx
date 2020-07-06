import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { signInUserThunk, removeCurrentUser } from '../../redux/actions/user'
import { AppState } from '../../types'
import Cookies from 'js-cookie'

export default function GoogleSignInOut() {
  const dispatch = useDispatch()

  const login = (response: any) => {
    dispatch(signInUserThunk(response))
  }

  const currentUser = useSelector((state: AppState) => state.user.currentUser)
  console.log(currentUser, 'Current User')

  const logout = () => {
    dispatch(removeCurrentUser)
    Cookies.remove('current-user')
    Cookies.remove('access-cookie')
  }

  const loginFailure = () => {
    alert('Login Failed')
  }

  const logoutFailure = () => {
    alert('Logout Failed')
  }

  return (
    <>
      {currentUser ? (
        <GoogleLogout
          clientId="659114991649-egsmdi2p7p7fu360cpq4i7evom0beq6c.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={logoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId="659114991649-egsmdi2p7p7fu360cpq4i7evom0beq6c.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={login}
          onFailure={loginFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </>
  )
}
