import {
  BookState,
  BookActions,
  CREATE_BOOK,
  BORROW_UNBORROW_BOOK,
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

  case BORROW_UNBORROW_BOOK: {
    const { book } = action.payload
    return {
      ...state,
      items: state.items.map(currentBook => currentBook._id === book._id ?
        { ...currentBook, isAvailable: book.isAvailable } : currentBook)
    }
  }

  default:
    return state
  }
}
