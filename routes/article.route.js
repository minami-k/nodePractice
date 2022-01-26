const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article.controller')

router.get('/', articleController.getPosts)

router.get('/add-post', articleController.getAddPost)

router.post('/add-post', articleController.postAddPost)

router.get('/edit-post/:postId', articleController.getEditPost)

router.post('/edit-post', articleController.postEditPost)

router.get('/posts/:postId', articleController.getPostById)

router.post('/delete-post', articleController.postDeletePost)

/* router.post('/shop/:productId/comment', articleController.postComment)
 */
module.exports = router