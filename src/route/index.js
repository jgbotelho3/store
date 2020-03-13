const express = require('express')
const routes = express.Router()
const users = require('./users')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')
const HomeController = require('../app/controllers/HomeController')

//Users 
routes.use('/users', users)

//Home
routes.get('/', HomeController.index)

//Products
routes.use('/products', products)

//Cart
routes.use('/cart', cart)

//Orders
routes.use('/orders', orders)

//Alias
routes.get('/ads/create', (req, res) => {
  return res.redirect('/products/create')
})

routes.get('/accounts', (req, res) => {
  return res.redirect('/users/login')
})



module.exports = routes
