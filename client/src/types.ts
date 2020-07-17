// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

// ACTION TYPES FOR BOOK
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const CREATE_BOOK = 'CREATE_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const BORROW_UNBORROW_BOOK = 'BORROW_UNBORROW_BOOK'

// ACTION TYOES FOR NOTIFICATION
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'

// ACTION TYPES FOR AUTHOR
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS'
export const CREATE_AUTHOR = 'CREATE_AUTHOR'
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'

//ACTION TYPES FOR USER
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

// Form value types
export type AuthorFormValues = Omit<Author, '_id'>
export type BookFormValues = Omit<Book, '_id'>

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A Product
export type Product = {
  id: string
  name: string
  price: number
}

// A Message
export type Message = {
  errorMessage: string
  successMessage: string
}

// An Author
export type Author = {
  _id: string
  firstName: string
  lastName: string
}

// A User
export type User = {
  cart: string[]
  firstName: string
  lastName: string
}

// A Book
export type Book = {
  _id: string
  title: string
  description: string
  publisher: string
  isAvailable: boolean
  authors: string[]
}

export type getAllAuthorsAction = {
  type: typeof GET_ALL_AUTHORS
  payload: {
    authors: Author[]
  }
}

export type createAuthorAction = {
  type: typeof CREATE_AUTHOR
  payload: {
    author: Author
  }
}

export type removeAuthorAction = {
  type: typeof REMOVE_AUTHOR
  payload: {
    author: Author
  }
}

export type updateAuthorAction = {
  type: typeof UPDATE_AUTHOR
  payload: {
    author: Author
  }
}

export type getAllBooksAction = {
  type: typeof GET_ALL_BOOKS
  payload: {
    books: Book[]
  }
}

export type createBookAction = {
  type: typeof CREATE_BOOK
  payload: {
    book: Book
  }
}

export type removeBookAction = {
  type: typeof REMOVE_BOOK
  payload: {
    book: Book
  }
}

export type updateBookAction = {
  type: typeof UPDATE_BOOK
  payload: {
    book: Book
  }
}

export type borrowUnborrowBookAction = {
  type: typeof BORROW_UNBORROW_BOOK
  payload: {
    book: Book
  }
}

export type addCurrentUserAction = {
  type: typeof ADD_CURRENT_USER
  payload: {
    user: User
  }
}

export type removeCurrentUserAction = {
  type: typeof REMOVE_CURRENT_USER
  payload: {}
}

export type addNotificationAction = {
  type: typeof ADD_NOTIFICATION
  payload: {
    message: Message
  }
}

export type UserActions = addCurrentUserAction | removeCurrentUserAction

export type NotificationActions = addNotificationAction

export type BookActions =
  | getAllBooksAction
  | createBookAction
  | updateBookAction
  | borrowUnborrowBookAction
  | removeBookAction

export type AuthorActions =
  | getAllAuthorsAction
  | createAuthorAction
  | removeAuthorAction
  | updateAuthorAction

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG
  payload: {
    dialog: DialogType
  }
}

export type UiActions = ToggleDialogAction

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type ProductState = {
  inCart: Product[]
}

export type BookState = {
  items: Book[]
}

export type AuthorState = {
  authors: Author[]
}

export type NotificationState = {
  message: Message
}

export type UserState = {
  users: User[]
  currentUser: User
}

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean
  }
}

export type AppState = {
  product: ProductState
  ui: UiState
  book: BookState
  author: AuthorState
  user: UserState
  notification: NotificationState
}
