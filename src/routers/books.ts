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
import passport from 'passport'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.put('/borrow',borrowBook) //user needs to go to specifc book to borrow and unborrow
router.put('/unborrow', unborrowBook)
router.get('/', findAll)
router.get('/:bookId', findById)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
