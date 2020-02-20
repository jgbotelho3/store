const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')

router.get('/', (req, res) => {
  return res.render('layout.njk')
})

router.get('/products/create', ProductController.create)

router.get('/ads/create', (req, res) => {
  return res.redirect('/products/create')
})


module.exports = router
