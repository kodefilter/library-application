import express from 'express'
import passport from 'passport'


const router = express.Router()


// Every path we define here will get '/auth' prefix
router.get('/login',(req, res) => {
    res.send('login')
})

router.get('/logout',(req, res) => {
    // handle with passport TODO
    res.send('logging out')
})


router.get('/google', passport.authenticate('google',{
    scope:['profile']
}))


router.get('/google/callback', function(req, res) { 
    //successful authentication, send this message
    res.send('Here in my garage')
})

export default router
