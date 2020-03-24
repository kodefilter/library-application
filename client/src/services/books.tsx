import { BookFormValues } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import { response } from 'express'
const baseUrl = 'http://localhost:3001/api/v1/books'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)

const getAll = () => {
    return axios({ method: 'get', url: baseUrl, headers: myHeaders })
}

const create = (newBook: BookFormValues) => {
    return axios({ method: 'post', url: baseUrl, data: newBook, headers: myHeaders })
}

const deleteEntry = (bookId: string) => {
    return axios({ method: 'delete', url: `${baseUrl}/${bookId}`,headers: myHeaders})
}




export default { getAll, create, deleteEntry }