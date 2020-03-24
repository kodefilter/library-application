import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import BookService from '../services/book'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import Author, { AuthorDocument } from '../models/Author'
import User from '../models/User'

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const body = req.body

    const book = new Book({
      title: body.title,
      description: body.description,
      publisher: body.publisher,
      isbn: body.isbn,
      status: body.status,
      publishedDate: body.publishedDate,
      authors: body.authors,
    })

    const savedBook = await BookService.create(book)

    /*
    // find the authors of the book and save the book id to their books array
    body.authors.map(async (author :AuthorDocument)=>{
      const foundAuthor = await Author.findById(author._id)
      console.log('found author inside controller',foundAuthor)
      foundAuthor?.books.push(savedBook._id)
      await foundAuthor?.save()
    })
    */

    res.json(savedBook)

  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//PUT /books/borrow
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  try {
    const borrow = req.body
    const bookId = req.body.bookId
    // make put request to /books/borrow for this
    /* this is todo for thursday 05.03.2020*/

    const user = await User.findById(req.body.userId)

    const borrowedBook = await BookService.borrow(bookId)
    user?.cart.push(borrowedBook?._id)
    await user?.save()
    res.json(borrowedBook)
    
  }catch (error){
    next(new NotFoundError('Book not found', error))
  }
}
// PUT /books/unborrow
export const unborrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const unborrow = req.body
    const bookId = req.body.bookId

    const user = await User.findById(req.body.userId)

    const unborrowedBook = await BookService.unborrow(bookId)
    user?.cart.pull(unborrowedBook) // need to make it work with filter
    await user?.save()
    res.json(unborrowedBook)

  }catch (error){
    next(new NotFoundError('Book not found', error))
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

// GET /books
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // pagination page = 0 and limit = 10
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 100
  }


  try {
    res.json(await BookService.findAll(pageOptions))
  } catch (error) {
    next(new NotFoundError('Books not found', error))
  }
}
