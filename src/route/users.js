const express = require('express')
const routes = express.Router()
const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const { onlyUsers, isLogged } = require('../app/middlewares/session')

//Login
routes.get('/login', isLogged, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

//Reset Password / Forgot
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/reset-password', SessionValidator.reset, SessionController.reset)

//User register
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)
routes.get('/', onlyUsers, UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)

//List products by user
routes.get('/ads', UserController.ads)

module.exports = routes
