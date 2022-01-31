const router = require('express').Router()

const userController = require('../controllers/user.controller')

router.get('/login', userController.getLogin)

router.post('/login', userController.postLogin)

router.get('/signup', userController.getSignUp)

router.post('/signup', userController.postSignUp)

router.post('/logout', userController.postLogout)

module.exports = router