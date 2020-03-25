import { BookFormValues, Book } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import { response } from 'express'
import { createBook, addNotification, removeBook, getAllBooks } from '../redux/actions'
import { Dispatch } from 'redux'
const baseUrl = 'http://localhost:3001/api/v1/books'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)

const getAll = async (dispatch: Dispatch) => {
    try {
        const response = await axios({ method: 'GET', url: baseUrl, headers: myHeaders })
        dispatch(getAllBooks(response.data))
      }
      catch (error) {
        dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
      }
}

const create = async (book: BookFormValues, dispatch: Dispatch) => {
    try {
      const response = await axios({ method: 'POST', url: baseUrl, data: book })
      dispatch(createBook(response.data))
    }
    catch (error) {
      dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
    } 
}

const deleteThis = async (book: Book, dispatch: Dispatch) => {
    try {
      const response = await axios({ method: 'DELETE', url: `${baseUrl}/${book._id}`, data: book })
      dispatch(removeBook(book))
      dispatch(addNotification({ errorMessage: '', successMessage: `You just deleted ${book.title}`})) 
    }
    catch (error) {
      dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
    } 
}



export default { getAll, create, deleteThis }