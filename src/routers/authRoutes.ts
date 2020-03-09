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


router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/api/v1/users',
    failureRedirect: '/api/v1/books'
}),function(req, res) { 
    //successful authentication, send this message
    res.redirect('/api/v1/users')
})

export default router
