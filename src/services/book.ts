import Book, { BookDocument } from "../models/Book"

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

function findAll(): Promise<BookDocument[]> {
  return Book.find()
    .sort({ title: 1, publishedDate: -1 })
    .exec() // Return a Promise
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
  deleteBook,
}
