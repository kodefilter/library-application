import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { GoogleLogin } from 'react-google-login'
import AuthenticationsService from '../../services/authentications'

export default function GoogleSignInOut() {
  
  
  const responseGoogle = (response :any) => {

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
