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
// Authentication Service
import AuthenticationService from '../services/authentication'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.put('/borrow',borrowBook)
router.put('/unborrow', unborrowBook)
router.get('/', AuthenticationService.checkAndVerifyToken, findAll)
router.get('/:bookId', findById)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
