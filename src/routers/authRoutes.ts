import express from 'express'
import passport from 'passport'
const {generateToken, sendToken, sendTokenAsCookie} = require ('../util/token')

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

router.post('/google', passport.authenticate('google-token', {session: false}), function(req,res,next) {
    if(!req.user) {
        return res.status(401).send('User Not Authenticated')
    }
    req.auth = {
        id: req.user.id,
        email: req.user.email
    }
    next()

},generateToken,sendToken)



export default router
