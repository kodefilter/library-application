import passport from 'passport'
const GoogleTokenStrategy = require('passport-google-token').Strategy

const User = require('mongoose').model('User')

passport.use(new GoogleTokenStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'] as string,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    //callbackURL: 'auth/google/callback'
},  function(accessToken,refreshToken,profile,done){

    // function to create or return user
     User.upsertGoogleUser(accessToken, refreshToken, profile, function(err: string | Error | undefined, user: any) {
        return done(err, user)
    })

}))