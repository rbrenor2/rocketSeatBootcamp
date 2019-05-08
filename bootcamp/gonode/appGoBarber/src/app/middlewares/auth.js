module.exports = (req, res, next) => {
  //* If there is a session and a user -> is logged in, then forbid returning to login page
  if (req.session && req.session.user) {
    //* locals = all the variables that we can call inside a binding in a njk file
    console.log('There is a user!')
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
