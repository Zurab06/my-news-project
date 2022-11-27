const {Router} = require('express')
const {newsController} = require('../controllers/news.controller')
const router = Router()

router.post('/add/',newsController.addPost)
router.delete('/news/:id',newsController.deletePost)
router.get('/all/',newsController.getNews)

module.exports = router