import { Dispatch } from 'redux'
import Cookies from 'js-cookie'
import BookService from '../../services/books'
import LendingService from '../../services/lendings'

import {
  GET_ALL_BOOKS,
  CREATE_BOOK,
  BORROW_UNBORROW_BOOK,
  REMOVE_BOOK,
  BookActions,
  Book,
  BookFormValues,
} from '../../types'
import { addNotification } from './notification'

export const getAllBooks = ( books: Book[]): BookActions => {
  console.log('Reached here at getAllBooks')
  return {
    type: GET_ALL_BOOKS,
    payload: {
      books
    }
  }
}

export const borrowUnborrowBook = ( book: Book): BookActions => {
  return {
    type: BORROW_UNBORROW_BOOK,
    payload: {
      book
    }
  }
}

export const removeBook = (book: Book): BookActions => {
  return {
    type: REMOVE_BOOK,
    payload: {
      book,
    },
  }
}


export const createBook = (book: Book): BookActions => {
  return {
    type: CREATE_BOOK,
    payload: {
      book,
    },
  }
}

export function unborrowBookThunk(book: Book){
  return (dispatch: Dispatch) => {
    return LendingService.unBorrow(book)
    .then(resp => resp.json())
    .then(book => {
      console.log(book)
      dispatch(borrowUnborrowBook(book))
    })
  }
}

export function borrowBookThunk(book: Book){
  return (dispatch: Dispatch) => {
    return LendingService.borrow(book)
    .then(resp => resp.json())
    .then(book => {
      console.log(book)
      dispatch(borrowUnborrowBook(book))
    })
  }
}

//Redux thunk for adding book use create(book)
export function removeBookThunk(book: Book){
  return async (dispatch: Dispatch) => {
      try {
      const response = await BookService.deleteEntry(book._id)
      dispatch(removeBook(book))
      dispatch(addNotification({ errorMessage: '', successMessage: `You just deleted ${book.title}` }))
    }
    catch (error) {
      dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
    }
  }
}



//Redux thunk for adding book use create(book)
export function addBookThunk(book: BookFormValues){
  return async (dispatch: Dispatch) => {
      try {
      const response = await BookService.create(book)
      dispatch(createBook(response.data))
      dispatch(addNotification({ errorMessage: '', successMessage: `You just added ${response.data.title}` }))
    }
    catch (error) {
      dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
    }
  }
}

// Async action processed by redux-thunk middleware
export function fetchBooksThunk() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await BookService.getAll()
      dispatch(getAllBooks(response.data))
    }
    catch (error) {
      dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
    }
  }
}
