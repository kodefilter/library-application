import React from 'react'
import { GoogleLogin } from 'react-google-login'

import useBooks from '../hooks/useBooks'

export default function Home() {
  console.log('home is running')
  useBooks()
  const googleClientId =
    '985263583298-rg19rjpqoks9q5c5kl6hb0lm181umld4.apps.googleusercontent.com'

  const handleResponse = (response: any) => {
    console.log(response)
  }

  return (
    <>
      <h1>Hello World</h1>
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login with Google"
        onSuccess={handleResponse}
        onFailure={handleResponse}
      />
    </>
  )
}
