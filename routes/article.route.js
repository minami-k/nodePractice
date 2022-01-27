const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article.controller')

router.get('/', articleController.getPosts)

router.get('/posts/:postId', articleController.getPostById)

router.post('/likes', articleController.postLike)
/* router.post('/shop/:productId/comment', articleController.postComment)
 */

module.exports = router