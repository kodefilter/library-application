// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

// ACTION TYPES FOR BOOK
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const CREATE_BOOK = 'CREATE_BOOK'


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

export type Book = {
  _id: string
  title: string
  description: string
  publisher: string
  isAvailable: boolean
  authors: string[] // to be implemented
  
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

export type BookActions = getAllBooksAction | createBookAction

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
}