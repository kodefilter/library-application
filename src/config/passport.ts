import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'

import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

const GoogleStrategy = passportGoogle.Strategy

passport.serializeUser((user: any, done) => {
    done(null,user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'] as string,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    callbackURL: "/auth/google/callback"
}, function(accessToken,refreshToken,profile,done){
    //check if user already exists in our database

    User.findOne({googleId: profile.id}).then((currentUser :any)=>{
        if(currentUser){
            done(undefined, currentUser)
        } else {
            new User({
                firstName : profile.name?.givenName,
                lastName : profile.name?.familyName,
                googleId : profile.id,
            }).save().then((newUser) => {
                done(undefined, newUser)
            })
        }
    })

}))