// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

// ACTION TYPES FOR BOOK
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const CREATE_BOOK = 'CREATE_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const BORROW_UNBORROW_BOOK = 'BORROW_UNBORROW_BOOK'

// ACTION TYOES FOR NOTIFICATION
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'

// ACTION TYPES FOR AUTHOR
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS'
export const CREATE_AUTHOR = 'CREATE_AUTHOR'
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR'

//ACTION TYPES FOR USER
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  id: string
  name: string
  price: number
}

//An Author
export type Author = {
  firstName: string
  lastName: string
}

export type User = {
  cart: string[]
  firstName: string
  lastName: string
}

export type BookFormValues = Omit<Book, '_id'>

//Book
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

export type Message = {
  errorMessage: string
  successMessage: string
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

export type borrowUnborrowBookAction = {
  type: typeof BORROW_UNBORROW_BOOK
  payload: {
    book: Book
  }
}

export type addNotificationAction = {
  type: typeof ADD_NOTIFICATION
  payload: {
    message: Message
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

export type UserActions = addCurrentUserAction | removeCurrentUserAction

export type NotificationActions = addNotificationAction

export type BookActions =
  | getAllBooksAction
  | createBookAction
  | borrowUnborrowBookAction
  | removeBookAction

export type AuthorActions = getAllAuthorsAction | createAuthorAction

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
