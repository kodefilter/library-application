import { Book } from '../types'
import Cookies from 'js-cookie'
const baseUrl = 'http://localhost:3001/api/v1/books'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)

const getAll = () => {

    const options: RequestInit = {
        method: "GET",
        mode: "cors",
        cache: "default",
        headers : myHeaders
      }
    return fetch(baseUrl,options)
}

const create = (newBook: Book) => {

    const blob = new Blob([JSON.stringify(newBook, null, 2)], {type : 'application/json'})

    const options: RequestInit = {
      method: "POST",
      body: blob,
      mode: "cors",
      cache: "default",
      headers : myHeaders
    }
    return fetch(baseUrl,options)
}




export default { getAll, create }