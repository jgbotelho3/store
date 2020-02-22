const db = require('../../config/db')

module.exports = {
  create (data) {
  
    const query = `
      INSERT INTO products(
        category_id,
        user_id,
        name,
        description,
        old_price,
        price, 
        quantity,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `


    data.price = data.price.replace(/\D/g, '')
    const values = [
      data.category_id,
      data.user_id || 1,
      data.name,
      data.description,
      data.old_price || data.price,
      data.price,
      data.quantity,
      data.status || 1
    ]

    return db.query(query, values)
  },

  find(product_id){

   return db.query(`SELECT * FROM products WHERE id = $1`, [product_id])
  },

  update(product){

    const query = `
      UPDATE products SET 
        category_id = ($1),
        user_id = ($2),
        name = ($3),
        description = ($4),
        old_price = ($5),
        price = ($6),
        quantity = ($7),
        status = ($8),
        updated_at = now()
        WHERE id = ($9)
    `
    const values = [
      product.category_id,
      product.user_id || 1,
      product.name,
      product.description,
      product.old_price,
      product.price,
      product.quantity,
      product.status,
      product.id
    ]

    return db.query(query, values)
  },

  delete (product_id){

    return db.query(`DELETE FROM products WHERE id = $1`, [product_id])
  }
}