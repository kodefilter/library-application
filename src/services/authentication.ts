import jwt from 'jsonwebtoken'

function checkToken (req, res, next){
    const token = req.headers['x-auth-token']
    console.log('this is the token in CHECKING', token)
    if(typeof token !==  'undefined') {
        
        next()
    } else {
        res.sendStatus(403)
    }
}

function signAndSendToken (req,res){
    req.token = jwt.sign({ id: req.auth.id, email: req.auth.email },process.env['JWT_SECRET'] as string,{ expiresIn: 60 * 120})
    res.setHeader('x-auth-token', req.token)
    return res.status(200).send(JSON.stringify(req.user))
    
}

function verifyToken (req,res,next){
    const token = req.headers['x-auth-token']
    console.log('this is the token in verifying', token)

    jwt.verify(token,process.env['JWT_SECRET'] as string, (err, authData) => {
        if(err) {
            
            res.sendStatus(500)
        } else {
            next()
        }
    })
    
}



export default {
    checkToken,
    verifyToken,
    signAndSendToken
}