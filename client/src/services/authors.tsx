import { Author } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/v1/authors'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)


const getAll = () => {
    return axios({ method: 'get', url: baseUrl, headers: myHeaders })
}


const create = (newAuthor: Author) => {
    return axios({ method: 'post', url: baseUrl, data: newAuthor, headers: myHeaders })
}

// delete request is going to delete entry in the database and then returns 204 status


export default { getAll, create }