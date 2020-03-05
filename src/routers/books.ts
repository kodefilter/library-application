import express from 'express'

import {
  createBook,
  findById,
  deleteBook,
  findAll,
  updateBook,
  borrowBook,
  unborrowBook,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.put('/:bookId/borrow',borrowBook) //user needs to go to specifc book to borrow and unborrow
router.put('/:bookId/unborrow', unborrowBook)
router.get('/:bookId', findById)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
