import jwt from 'jsonwebtoken'

function checkAndVerifyToken (req, res, next){
    const token = req.headers['x-auth-token']
    if(typeof token !==  'undefined') {
        jwt.verify(token,process.env['JWT_SECRET'] as string, (err, authData) => {
            if(err) {            
                res.sendStatus(500)
            } else {
                next()
            }
        })        
    } else {
        res.sendStatus(403)
    }
}

function signAndSendToken (req,res){
    req.token = jwt.sign({ id: req.auth.id, email: req.auth.email },process.env['JWT_SECRET'] as string,{ expiresIn: 60 * 120})
    res.setHeader('x-auth-token', req.token)
    return res.status(200).send(JSON.stringify(req.user))
    
}

export default {
    checkAndVerifyToken,
    signAndSendToken
}