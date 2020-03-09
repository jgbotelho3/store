const Base = require('./Base')
Base.init({ table: 'files' })

module.exports = {
  ...Base
}

// async delete (id) {
//   try {
//     const query = await db.query(`SELECT * FROM files WHERE id = $1`, [id])

//     const file = query.rows[0]

//     fs.unlinkSync(file.path)
//   } catch (err) {
//     console.error(err)
//   }

//   return db.query(`DELETE FROM files WHERE id = $1`, [id])
// }
