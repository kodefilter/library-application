import mongoose, { Document } from 'mongoose'
import { Book } from 'library'

export type BookDocument = Document & Book

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: String,
  isbn: Number,
  isAvailable : {
    type : Boolean,
    default : true
  },
  publishedDate: Date,
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
})

export default mongoose.model<BookDocument>('Book', bookSchema)
