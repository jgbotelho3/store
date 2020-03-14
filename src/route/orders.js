const express = require('express')
const routes = express.Router()
const OrderController = require('../app/controllers/OrderController')
const { onlyUsers } = require('../app/middlewares/session')


routes.post('/', OrderController.post)
routes.get('/', OrderController.index)
routes.get('/sales', OrderController.sales)

module.exports = routes
