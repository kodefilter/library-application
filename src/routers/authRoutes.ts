import express from 'express'
import passport from 'passport'
import AuthenticationService from '../services/authentication'


const router = express.Router()

/*

router.get('/login',(req, res) => {
    res.send('login')
})

router.get('/logout',(req, res) => {
    // handle with passport TODO
    res.send('logging out')
})
*/


// Every path we define here will get '/auth' prefix
router.get('/google', passport.authenticate('google',{
    scope:['profile'],
    session: false,
    accessType : 'offline',
}))


router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/v1/books'
}),function(req, res) { 
    AuthenticationService.signToken(req, res)
})

export default router
