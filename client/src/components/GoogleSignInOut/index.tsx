import React from 'react'
import { GoogleLogin } from 'react-google-login'
import AuthenticationsService from '../../services/authentications'

export default function GoogleSignInOut() {
  
  const responseGoogle = (response :any) => {

    // first we need to dispatch a thunk action
    // create a redux thunk action for sign in
    // create a user service for that and also refactor or remove authentication service
    

    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken},null,2)], { type: 'application/json' }) 
    const options: RequestInit = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    }
    AuthenticationsService.signIn(options)
  }

  return (
    <>
    <GoogleLogin
    clientId="659114991649-egsmdi2p7p7fu360cpq4i7evom0beq6c.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    />
    </> 
  )
}
