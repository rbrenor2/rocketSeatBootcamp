const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('../views/auth/signin.njk')
  }

  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('User not found!')
      req.flash('error', 'User not found.')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Incorrect password!')
      req.flash('error', 'Incorrect password.')
      return res.redirect('/')
    }

    req.session.user = user
    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
