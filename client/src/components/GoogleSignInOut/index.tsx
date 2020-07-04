import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { signInUserThunk } from '../../redux/actions/user'
import { AppState } from '../../types'

export default function GoogleSignInOut() {
  const dispatch = useDispatch()

  const currentUser = useSelector((state: AppState) => state.user.currentUser)

  const login = (response: any) => {
    dispatch(signInUserThunk(response))
  }

  const logout = () => {
    // dispatch(signOutUserThunk()) need to implement this thunk
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
