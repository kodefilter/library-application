import Cookies from 'js-cookie'
import { Dispatch } from 'redux'
import { addCurrentUser } from '../redux/actions/user'
const baseUrl = 'http://localhost:3001/auth/google'

const signIn =  async (response: any, dispatch: Dispatch) => {

    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken},null,2)], { type: 'application/json' })

    const options: RequestInit = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    }

    fetch(baseUrl,options).then(res => {
        const token = res.headers.get('x-auth-token')
        res.json().then( user => {
            if(token) {
                Cookies.set('access-cookie', token)
                Cookies.set('current-user',user)
                dispatch(addCurrentUser(user))
            }
            
        })
    })    
}

export default { signIn }