import React from 'react'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInUserThunk } from '../redux/actions/user'

export default function Landing() {
  const history = useHistory()

  const dispatch = useDispatch()

  const login = (response: any) => {
    dispatch(signInUserThunk(response))
    history.push('/home')
  }

  const loginFailure = () => {
    alert('Login Failed')
  }

  return (
    <>
      <GoogleLogin
        clientId="659114991649-egsmdi2p7p7fu360cpq4i7evom0beq6c.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={login}
        onFailure={loginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )
}
