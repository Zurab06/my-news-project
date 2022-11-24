const jwt = require('jsonwebtoken')
const {secret} = require('../controllers/config')
module.exports= function (roles) {
    return function (req,res,next){
        if(req.method==='OPTIONS'){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(400).json({message: 'user not authorized'})

            }

            const {roles: userRoles} = jwt.verify(token,secret)
            console.log(roles, userRoles);
            let hasRole = true
            userRoles.forEach (role => {
                if(roles.includes(role)){
                    hasRole=true
                }
                
            });
            if(!hasRole){
                return res.status(403).json({message:'access denied'})

            }
            next()


        } catch (error) {
            console.log(error);
        
            return res.status(403).json({message:'not authorized'})
        }
    }
    
}