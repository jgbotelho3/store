const express = require('express')
const routes = express.Router()
const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

// //Login
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// //Reset Password / Forgot
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.post('/forgot-password', SessionController.forgot)
// routes.get('/password-reset', SessionController.resetForm)
// routes.post('/password-reset', SessionController.reset)

// //User register
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)
routes.get('/', UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
// routes.delete('/register', UserController.delete)

module.exports = routes