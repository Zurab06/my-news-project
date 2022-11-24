const jwt = require('jsonwebtoken')
const {secret} = require('../controllers/config')
module.exports = function (req,res,next){

    if(req.method === 'OPTIONS'){

        next()
    }  
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(400).json({message: 'user not found'})
        }
        
        const decodedToken = jwt.verify(token,secret)
        req.user = decodedToken
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: 'user not authorized'})
    }
}