import { Author } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/v1/authors'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)

const getAll = () => {
    const request = axios({ method: 'get', url: baseUrl, headers: myHeaders })
    return request.then(response => response.data)  
}


const create = (newAuthor: Author) => {

      const blob = new Blob([JSON.stringify(newAuthor, null, 2)], {type : 'application/json'})

      const options: RequestInit = {
        method: "POST",
        body: blob,
        mode: "cors",
        cache: "default",
      }
      return fetch(baseUrl,options)
}

export default { getAll, create }