const {Router} = require('express')
const {UserController} = require('../controllers/userController')
const router = Router()
const {check} = require('express-validator')
const roleMiddleware = require('../middlewares/rolemiddleware')

router.post('/signUp/', 
[check('login','login empty').notEmpty(),
check('password','short password').isLength({max:10,min:2})],
UserController.signUp)
router.post('/signIn', UserController.signIn)
router.get('/users/',roleMiddleware(['ADMIN']), UserController.getUsers)
module.exports = router

