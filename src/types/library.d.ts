export type Book = {
  title: string
  description: string
  publisher: string
  isbn: number
  status: {
    available: string
    borrowed: string
  }
  publishedDate: Date
  authors: Author[] //array of author Object ids
}

export type Author = {
  firstName: string
  lastName: string
  books: Book[] // array of book Object ids
}

export type User = {
  firstName: string
  lastName: string
  email: string
  cart: Book[]
}

export type PageOptions = {
  page: number
  limit: number
}
