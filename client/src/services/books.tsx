import { BookFormValues, Book } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import {
  createBook,
  addNotification,
  removeBook,
  getAllBooks,
} from '../redux/actions'
import { Dispatch } from 'redux'

const baseUrl = 'http://localhost:3001/api/v1/books'

;(function() {
  const token = Cookies.get('access-cookie') as string
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    axios.defaults.headers.common['x-auth-token'] = null
    /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
})()

const getAll = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(baseUrl)
    dispatch(getAllBooks(response.data))
  } catch (error) {
    dispatch(
      addNotification({
        errorMessage: `This Error happened ${error}`,
        successMessage: '',
      })
    )
  }
}

const create = async (book: BookFormValues, dispatch: Dispatch) => {
  try {
    const response = await axios({ method: 'POST', url: baseUrl, data: book })
    dispatch(createBook(response.data))
  } catch (error) {
    dispatch(
      addNotification({
        errorMessage: `This Error happened ${error}`,
        successMessage: '',
      })
    )
  }
}

const deleteThis = async (book: Book, dispatch: Dispatch) => {
  try {
    await axios({ method: 'DELETE', url: `${baseUrl}/${book._id}`, data: book })
    dispatch(removeBook(book))
    dispatch(
      addNotification({
        errorMessage: '',
        successMessage: `You just deleted ${book.title}`,
      })
    )
  } catch (error) {
    dispatch(
      addNotification({
        errorMessage: `This Error happened ${error}`,
        successMessage: '',
      })
    )
  }
}

const updateThis = async (book: Book, dispatch: Dispatch) => {
  try {
    await axios({ method: 'PUT', url: `${baseUrl}/${book._id}`, data: book })
    //dispatch(updateBook(book)) need to implement this in redux
    dispatch(
      addNotification({
        errorMessage: '',
        successMessage: `You just deleted ${book.title}`,
      })
    )
  } catch (error) {
    dispatch(
      addNotification({
        errorMessage: `This Error happened ${error}`,
        successMessage: '',
      })
    )
  }
}

export default { getAll, create, deleteThis, updateThis }
