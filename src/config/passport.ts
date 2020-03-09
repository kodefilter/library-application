import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'

import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

const GoogleStrategy = passportGoogle.Strategy


passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'] as string,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    callbackURL: "/auth/google/callback"
}, function(accessToken,refreshToken, profile,cb){
    //todo to create a user if it does not exist already
}))