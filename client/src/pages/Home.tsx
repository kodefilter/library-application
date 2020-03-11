import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import Cookies from 'js-cookie'


export default function Home() {

  const [ user, setUser] = useState({"user" : "",
"token" : ""})
  
  const responseGoogle = (response :any) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken},null,2)], { type: 'application/json' })

    const options: RequestInit = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    }
    

  fetch('http://localhost:3001/auth/google',options).then((r) => { 
    const token = r.headers.get('x-auth-token')
    
    r.json().then(user => {
    
      if(token) {
        Cookies.set('access-cookie', token)
          setUser({user,token})
          // set state of the user
        }
      })
  })
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
    {console.log(user)}

    </>  
    
  )
}
