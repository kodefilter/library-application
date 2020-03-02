import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import BookService from '../services/book'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import Author from '../models/Author'

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body

    // send authorId in the request and get it here to find the author
    const author = await Author.findById(body.authorId)

    const book = new Book({
      title: body.title,
      description: body.description,
      publisher: body.publisher,
      isbn: body.isbn,
      status: body.status,
      publishedDate: body.publishedDate,
      authors: [author?._id],
    })

    const savedBook = await BookService.create(book)
    author?.books.push(savedBook._id)
    await author?.save()
    res.json(savedBook)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await BookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

// GET /books/:bookId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

// GET /movies
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAll())
  } catch (error) {
    next(new NotFoundError('Books not found', error))
  }
}
