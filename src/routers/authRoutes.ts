import express from 'express'
import passport from 'passport'
import AuthenticationService from '../services/authentication'
const router = express.Router()


// Every path we define here will get '/auth' prefix

router.post('/google', passport.authenticate('google-token', {session: false}), function(req: any,res,next) {
    if(!req.user) {
        return res.status(401).send('User Not Authenticated')
    }
    req.auth = {
        id: req.user.id,
        email: req.user.email
    }
    console.log('reached here',req.auth)
    next()

},AuthenticationService.signAndSendToken)



export default router
