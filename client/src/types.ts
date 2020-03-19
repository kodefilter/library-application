// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

// ACTION TYPES FOR BOOK
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const CREATE_BOOK = 'CREATE_BOOK'
export const BORROW_UNBORROW_BOOK = 'BORROW_UNBORROW_BOOK'

// ACTION TYOES FOR NOTIFICATION
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'


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

//Book
export type Book = {
  title: string
  description: string
  publisher: string
  isAvailable: boolean  
}

export type Message = {
  errorMessage : string,
  successMessage : string
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

export type borrowUnborrowBookAction = {
  type: typeof BORROW_UNBORROW_BOOK
  payload: {
    book: Book
  }
}

export type addNotificationAction = {
  type: typeof ADD_NOTIFICATION
  payload: {
    message : Message
  }
}

export type NotificationActions = addNotificationAction

export type BookActions = getAllBooksAction | createBookAction | borrowUnborrowBookAction

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



export type NotificationState = {
  message : Message
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
  notification : NotificationState
}
