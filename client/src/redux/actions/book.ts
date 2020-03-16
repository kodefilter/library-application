import { Dispatch } from 'redux'
import Cookies from 'js-cookie'

import {
  GET_ALL_BOOKS,
  CREATE_BOOK,
  BookActions,
  Book,
} from '../../types'

export const getAllBooks = ( books: Book[]): BookActions => {
  return {
    type: GET_ALL_BOOKS,
    payload: {
      books
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


//
export function fetchBooks(){
  return (dispatch: Dispatch) => {
    return fetch('http://localhost:3001/api/v1/books',{ headers: { 'x-auth-token': Cookies.get('access-cookie') as string}})
    .then(resp => resp.json())
    .then(books => {
      console.log(books)
      dispatch(getAllBooks(books))
    })
  }
}
