const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '040c5a3e95b5d6',
    pass: '541409de6a6419'
  }
})
