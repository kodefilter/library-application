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
  email: String,
})

export default mongoose.model<UserDocument>('User', userSchema)
