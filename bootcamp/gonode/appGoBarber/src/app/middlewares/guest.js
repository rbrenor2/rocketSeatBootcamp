module.exports = (req, res, next) => {
  // If there is no user
  if (req.session && !req.session.user) {
    return next()
  }

  return res.redirect('/app/dashboard')
}
