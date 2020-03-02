import express from 'express'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.put('/:bookId', updateAuthor)
router.delete('/:bookId', deleteAuthor)
router.post('/', createAuthor)

export default router
