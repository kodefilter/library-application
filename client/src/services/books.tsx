import axios from 'axios'
import { Book } from '../types'
const baseUrl = 'http://localhost:3001/api/v1/books/'


const create = (newBook: Book) => {
    const request = axios.post(baseUrl, newBook)
    return request.then(response => response.data)  
}

const update = (bookId: string, newBook: Book) => {
    const request = axios.put(`${baseUrl}/${bookId}`, newBook)
    return request.then(response => response.data)
}


export default { create, update }