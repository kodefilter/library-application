import express from 'express'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/login',(req, res) => {
    res.render('login')
})

router.get('/logout',(req, res) => {

    // handle with passport TODO
    res.render('logging out')
})



router.get('/google', (req,res) => {
    //handle with passport TODO

    res.send('loggin in with google')
})




export default router
