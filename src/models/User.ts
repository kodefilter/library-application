import mongoose, { Document } from 'mongoose'
import { User } from '../types/library'

export type UserDocument = Document & User

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  googleId : String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  email: String,
})

export default mongoose.model<UserDocument>('User', userSchema)
