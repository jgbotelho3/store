const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')
const { formatPrice, date } = require('../../lib/utils')

module.exports = {
  create (req, res) {
    Category.all()
      .then(results => {
        const categories = results.rows
        return res.render('products/create.njk', { categories })
      })
      .catch(err => {
        throw new Error(err)
      })
  },

  async post (req, res) {
    const keys = Object.keys(req.body)
    let error = ''
    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Preencha todos os campos')
      }
    }

    if (req.files.length == 0) return res.send('Please send at least an image')

    let results = await Product.create(req.body)
    const productId = results.rows[0].id

    const filesPromise = req.files.map(file =>
      File.create({
        ...file,
        product_id: productId
      })
    )

    await Promise.all(filesPromise)

    return res.redirect(`/products/${productId}/edit`)
  },
 
  async show(req, res){

    let results = await Product.find(req.params.id)
    const product = results.rows[0]

    if(!product){
      return res.send('product not found!!!')
    }

    const { month, day, hour, minutes } = date(product.updated_at)

    product.published = {
      day: `${day}/${month}`,
      hour: `${hour}h${minutes}min`
    }

    product.oldPrice = formatPrice(product.old_price)
    product.price = formatPrice(product.price)

      return res.render('products/show', {product})
  },

  async edit (req, res) {
    let results = await Product.find(req.params.id)
    const product = results.rows[0]

    if (!product) return res.send('Product not found')

    product.old_price = formatPrice(product.old_price)
    product.price = formatPrice(product.price)

    // get categories
    results = await Category.all()
    const categories = results.rows

    //get images
    results = await Product.files(product.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        'public',
        ''
      )}`
    }))

    return res.render('products/edit.njk', { product, categories, files })
  },

  async put (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == '' && key != 'removed_files') {
        const error = 'Preencha todos os campos'
        return res.render(`products/edit`, { error })
      }
    }

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file =>
        File.create({ ...file, product_id: req.body.id })
      )

      await Promise.all(newFilesPromise)
    }

    if (req.body.removed_files) {
      
      const removedFiles = req.body.removed_files.split(',')
      const lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)

      const removedFilesPromise = removedFiles.map(id => File.delete(id))

      await Promise.all(removedFilesPromise)
    }

    req.body.price = req.body.price.replace(/\D/g, '')
    req.body.old_price = req.body.old_price.replace(/\D/g, '')

    if (req.body.old_price != req.body.price) {
      const oldProduct = await Product.find(req.body.id)
      req.body.old_price = oldProduct.rows[0].price
    }

    await Product.update(req.body)

    return res.redirect(`/products/${req.body.id}`)
  },

  async delete (req, res) {
    const product = await Product.find(req.body.id)

    if (!product) {
      return res.send('user not Found')
    }

    await Product.delete(req.body.id)

    return res.redirect('/products/create')
  }
}
