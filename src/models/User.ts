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
  googleId : {
    type: String
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  email: String,
})

userSchema.set('toJSON', {getters: true, virtuals: true})

userSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
  
  //console.log('Statics Access Token', accessToken)
  const that = this
  return this.findOne({ 'googleId': profile.id }, function (err, user) {
    if (!user) {
      const newUser = new that({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id
      })
      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error)
        }
        return cb(error, savedUser)
      })
    }
    else {
      return cb(err, user)
    }
  })
}

export default mongoose.model<UserDocument>('User', userSchema)
