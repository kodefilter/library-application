import {
  AuthorState,
  AuthorActions,
  CREATE_AUTHOR,
  GET_ALL_AUTHORS,
  REMOVE_AUTHOR,
} from '../../types'

export default function author(
  state: AuthorState = { authors: [] },
  action: AuthorActions
): AuthorState {
  switch (action.type) {
  case GET_ALL_AUTHORS: {
    const { authors } = action.payload
    return { ...state, authors: authors }
  }

  case CREATE_AUTHOR: {
    const { author } = action.payload
    return { ...state, authors: [...state.authors, author] }
  }

  case REMOVE_AUTHOR: {
    const { author } = action.payload
    const newItems = state.authors.filter(item => item._id !== author._id)
    return { ...state, authors: newItems }
  }

  default:
    return state
  }
}
