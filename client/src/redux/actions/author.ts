import { Dispatch } from 'redux'
import Cookies from 'js-cookie'
import AuthorService from '../../services/authors'
import LendingService from '../../services/lendings'

import {
  GET_ALL_AUTHORS,
  CREATE_AUTHOR,
  AuthorActions,
  Author,
} from '../../types'
import { addNotification } from './notification'

export const getAllAuthors = ( authors: Author[]): AuthorActions => {
  return {
    type: GET_ALL_AUTHORS,
    payload: {
      authors
    }
  }
}

export const createAuthor = (author: Author): AuthorActions => {
  return {
    type: CREATE_AUTHOR,
    payload: {
      author,
    },
  }
}

//Redux thunk for adding author use create(author)
export function addAuthorThunk(author: Author){
  return (dispatch: Dispatch) => {
      return AuthorService.create(author)
      .then(resp => resp.json())
      .then( addedAuthor => {
        dispatch(createAuthor(addedAuthor))
        dispatch(addNotification({ errorMessage: '', successMessage: `You just added ${addedAuthor.firstName}` }))
      })
  }
}

// Async action processed by redux-thunk middleware
export function fetchAuthorsThunk() {
  return (dispatch: Dispatch) => {
    return AuthorService.getAll()
      .then(authors => {
        dispatch(getAllAuthors(authors))
      })
  }
}
