import { Author } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNotification, createAuthor, getAllAuthors } from '../redux/actions'
import { Dispatch } from 'redux'
const baseUrl = 'http://localhost:3001/api/v1/authors'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)


const getAll = () => {
    return axios({ method: 'get', url: baseUrl, headers: myHeaders })
}


const create = (newAuthor: Author) => {
    return axios({ method: 'post', url: baseUrl, data: newAuthor, headers: myHeaders })
}


export default { getAll, create }