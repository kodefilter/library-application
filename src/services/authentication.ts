import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

function checkAndVerifyToken (req: Request, res: Response, next: NextFunction){

    const token  = req.headers['x-auth-token']

    if(typeof token !==  'undefined') {
        jwt.verify(token,process.env['JWT_SECRET'] as string, (err: Error, authData: any) => {
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

function signAndSendToken (req: any, res: Response){
    req.token = jwt.sign({ id: req.auth.id, email: req.auth.email },process.env['JWT_SECRET'] as string,{ expiresIn: 60 * 120})
    res.setHeader('x-auth-token', req.token)
    return res.status(200).send(JSON.stringify(req.user))
    
}

export default {
    checkAndVerifyToken,
    signAndSendToken
}