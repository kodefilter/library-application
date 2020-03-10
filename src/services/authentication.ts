import jwt from 'jsonwebtoken'


// Issue Token
const signToken = (req: any, res: any) => {
    jwt.sign({userId: req.user._id}, 'secretkey', {expiresIn:'5 min'}, (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.json({token});
        }
    });
}
// check if Token exists on request Header and attach token to request as attribute
const checkTokenMW = (req :any, res: any, next: any) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    } else {
        res.sendStatus(403);
    }
}

export default {
    signToken,
    checkTokenMW
}