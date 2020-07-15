import {
  BookState,
  BookActions,
  CREATE_BOOK,
  BORROW_UNBORROW_BOOK,
  GET_ALL_BOOKS,
  REMOVE_BOOK,
  UPDATE_BOOK,
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

  case CREATE_BOOK: {
    const { book } = action.payload
    return { ...state, items: [...state.items, book] }
  }

  case REMOVE_BOOK: {
    const { book } = action.payload
    const newItems = state.items.filter(item => item._id !== book._id)
    return { ...state, items: newItems }
  }

  case UPDATE_BOOK: {
    const { book } = action.payload
    return {
      ...state,
      items: state.items.map(oldBook =>
        oldBook._id === book._id ? oldBook : book
      ),
    }
  }

  case BORROW_UNBORROW_BOOK: {
    const { book } = action.payload
    return {
      ...state,
      items: state.items.map(currentBook =>
        currentBook.title === book.title
          ? { ...currentBook, isAvailable: book.isAvailable }
          : currentBook
      ),
    }
  }

  default:
    return state
  }
}
