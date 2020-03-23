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

//Redux thunk for adding author use create(author) usinfg fetch in service
export function addAuthorThunk(author: Author){
  return async (dispatch: Dispatch) => {
      try {
      const response = await AuthorService.create(author)
      dispatch(createAuthor(response.data))
      dispatch(addNotification({ errorMessage: '', successMessage: `You just added ${response.data.firstName}` }))
    }
    catch (error) {
      dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
    }
  }
}

// Async action processed by redux-thunk middleware
export function fetchAuthorsThunk() {
  return (dispatch: Dispatch) => {
    return AuthorService.getAll()
    .then(response => {
      dispatch(getAllAuthors(response.data))
    })
    .catch(error => {
      dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
    })
  }
}
