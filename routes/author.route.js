const express = require('express')
const router = express.Router()
const authorController = require('../controllers/author.controller')

router.get('/', authorController.getPosts)

router.get('/add-post', authorController.getAddPost)

router.post('/add-post', authorController.postAddPost)

router.get('/edit-post/:postId', authorController.getEditPost)

router.post('/edit-post', authorController.postEditPost)

router.post('/delete-post', authorController.postDeletePost)

module.exports = router