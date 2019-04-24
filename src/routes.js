const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
// chama a funcao de rotas do express
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

// chama os controllers
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

// adiciona varial global para que todas as views do nunjuks fiquem sabendo das mensagens de erro
routes.use((req, res, next) => {
  res.locals.flashError = req.flash('error')
  res.locals.flashSuccess = req.flash('success')
  return next()
})

routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// todas as rotas que estiverem com /app passa pelo middleware de auth
routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/appointments/new/:providerId', AppointmentController.create)
routes.post('/app/appointments/new/:providerId', AppointmentController.store)
routes.get('/app/available/:providerId', AvailableController.index)

module.exports = routes
