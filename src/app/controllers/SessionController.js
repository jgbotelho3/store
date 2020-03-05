const User = require('../models/User')
const crypto = require('crypto')
const { hash } = require('bcryptjs')
const mailer = require('../../lib/mailer')

module.exports = {
  loginForm (req, res) {
    return res.render('session/login')
  },

  login (req, res) {
    req.session.userId = req.user.id

    return res.redirect('/users')
  },

  logout (req, res) {
    req.session.destroy()
    return res.redirect('/')
  },

  forgotForm (req, res) {
    return res.render('session/forgot-password')
  },

  async forgot (req, res) {
    const user = req.user

    const token = crypto.randomBytes(20).toString('hex')

    let now = new Date()
    now = now.setHours(now.getHours() + 1)

    await User.update(user.id, {
      reset_token: token,
      reset_token_expires: now
    })

    await mailer.sendMail({
      to: user.email,
      from: 'no-reply@launchstore.com.br',
      subject: 'Recuperação',
      html: `<h2>Você perdeu a senha?</h2>
      <p>Não se preocupe, é só clicar no link abaixo para redefinir sua senha</p>
      <p><a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
        Recuperar senha
      </a></p>`
    })

    return res.render('session/forgot-password', {
      success: `Enviamos um email para ${user.email} com as instruções para redefinir sua senha`
    })
  },

  resetForm (req, res) {
    return res.render('session/reset-password', {
      token: req.query.token
    })
  },

  async reset (req, res) {
    const { password, token } = req.body
    const user = req.user

    try {
      const newPassword = await hash(password, 8)
    
      await User.update(user.id, {
        password: newPassword,
        reset_token: '',
        reset_token_expires: ''
      })

      return res.render('session/login', {
        user: req.body,
        success: 'Senha atualizada com sucesso! Faça login para continuar'
      })

    } catch (err) {
      console.error(err)
      return res.render('session/reset-password', {
        user: req.body,
        token,
        error: 'Erro inesperado, tente novamente'
      })
    }
  }
}
