import { Dispatch } from 'redux'
import AuthorService from '../../services/authors'

import {
  GET_ALL_AUTHORS,
  CREATE_AUTHOR,
  AuthorActions,
  Author,
  REMOVE_AUTHOR,
  AuthorFormValues,
} from '../../types'

export const getAllAuthors = (authors: Author[]): AuthorActions => {
  return {
    type: GET_ALL_AUTHORS,
    payload: {
      authors,
    },
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

export const removeAuthor = (author: Author): AuthorActions => {
  return {
    type: REMOVE_AUTHOR,
    payload: {
      author,
    },
  }
}

export function fetchAuthorsThunk() {
  return async (dispatch: Dispatch) => {
    return AuthorService.getAll(dispatch)
  }
}

//Redux thunk for adding author use create(author) usinfg fetch in service
export function addAuthorThunk(author: AuthorFormValues) {
  return async (dispatch: Dispatch) => {
    return AuthorService.create(author, dispatch)
  }
}

export function removeAuthorThunk(author: Author) {
  return async (dispatch: Dispatch) => {
    return AuthorService.deleteThis(author, dispatch)
  }
}
