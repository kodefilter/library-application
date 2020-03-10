import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'

import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

const GoogleStrategy = passportGoogle.Strategy

passport.serializeUser((user: any, done) => done(null,user.id))

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
})

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'] as string,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    callbackURL: "/auth/google/callback"
}, function(accessToken,refreshToken,profile,done){
    //check if user already exists in our database

    User.findOne({googleId: profile.id}).then((currentUser :any)=>{
        if(currentUser){
            return done(undefined, currentUser)
        } else {
            new User({
                firstName : profile.name?.givenName,
                lastName : profile.name?.familyName,
                googleId : profile.id,
            }).save().then(newUser => done(undefined, newUser))
        }
    })

}))