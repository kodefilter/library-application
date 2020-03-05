import Book, { BookDocument } from '../models/Book'
import { PageOptions } from 'library'
import Author, { AuthorDocument } from '../models/Author'



function create(book: BookDocument): Promise<BookDocument> {
  return book.save()
}

function findById(bookId: string): Promise<BookDocument> {
  return Book.findById(bookId)
    .exec() // .exec() will return a true Promise
    .then(book => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }
      return book
    })
}

function findAll(pageOptions :PageOptions): Promise<BookDocument[]> {
  return Book.find()
    .populate('authors', { firstName: 1, lastName: 1 })
    .sort({ title: 1})
    .skip(pageOptions.page * pageOptions.limit) //for pagination
    .limit(pageOptions.limit) // limiting
    .exec() // Return a Promise
}

function borrow(
  bookId :string,
): Promise<BookDocument | null> {
  return Book.findById(bookId).exec()
  .then(book => {
    if (!book) {
      throw new Error(`Book ${bookId} not found`)
    }
    // make book unavailable once it is borrowed
    book.isAvailable = false

    // Add more fields here if needed
    return book.save()
  })

}

function unborrow(
  bookId :string,
): Promise<BookDocument | null> {
  return Book.findById(bookId).exec()
  .then(book => {
    if (!book) {
      throw new Error(`Book ${bookId} not found`)
    }
    // make book available once it is unborrowed
    book.isAvailable = true

    // Add more fields here if needed
    return book.save()
  })

}


function update(
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> {
  return Book.findById(bookId)
    .exec()
    .then(book => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }

      if (update.title) {
        book.title = update.title
      }
      if (update.publishedDate) {
        book.publishedDate = update.publishedDate
      }
      if (update.description) {
        book.description = update.description
      }

      // Add more fields here if needed
      return book.save()
    })
}

function deleteBook(movieId: string): Promise<BookDocument | null> {
  return Book.findByIdAndDelete(movieId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  borrow,
  unborrow,
  deleteBook,
}
