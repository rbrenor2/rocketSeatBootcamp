const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

// Adding middleware to let flash messages available to nunjucks trough res.locals
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// Signup routes
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// Signin routes
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

// Logout route
routes.get('/app/logout', SessionController.destroy)

// App routes
// Add authMiddleware to all /app routes
routes.use('/app', authMiddleware)
routes.get('/app/dashboard', DashboardController.index)

// File route
routes.get('/files/:file', FileController.show)

// Appointments routes
routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

// Providers list

routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
