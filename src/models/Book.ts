import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
    title: string,
    description: string,
    publisher: string,
    authors: string[],
    isbn: number,
    status: {
        available: string,
        borrowed: string,
    }
    publishedDate: Date,
}

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      index: true,
    },
    description: {
      type: String,
      required: true,
      min: 1900,
    },
    publisher: String,
    authors: [String],
    isbn: Number,
    status: {
        available: String,
        borrowed: String,
    },
    publishedDate: Date
  })
  
  export default mongoose.model<BookDocument>('Book', bookSchema)
