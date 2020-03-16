import {
  BookState,
  BookActions,
  CREATE_BOOK,
  GET_ALL_BOOKS,
} from '../../types'

export default function book(
  state: BookState = { items: [] },
  action: BookActions
): BookState {
  switch (action.type) {


  case GET_ALL_BOOKS: {
    const { books } = action.payload
    return { ...state, items: books }
  }

  default:
    return state
  }
}
