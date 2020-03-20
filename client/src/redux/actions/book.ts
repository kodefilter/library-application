import { Dispatch } from 'redux'
import Cookies from 'js-cookie'
import BookService from '../../services/books'
import LendingService from '../../services/lendings'

import {
  GET_ALL_BOOKS,
  CREATE_BOOK,
  BORROW_UNBORROW_BOOK,
  BookActions,
  Book,
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
export function addBookThunk(book: Book){
  return (dispatch: Dispatch) => {
    return BookService.create(book)
    .then(resp => resp.json())
    .then(book => {
      console.log(book)
      dispatch(createBook(book))
    })
  }
}

// Async action processed by redux-thunk middleware
export function fetchBooksThunk() {
  return (dispatch: Dispatch) => {
    return BookService.getAll()
      .then(resp => resp.json())
      .then(books => {
        dispatch(getAllBooks(books))
      })
  }
}
