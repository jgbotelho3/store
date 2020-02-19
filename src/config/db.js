const { Pool } = require('pg')

module.exports = new Pool({
  user: 'postgres',
  password: 'jgbotelho',
  host: 'localhost',
  port: 5432,
  database: 'store'
})