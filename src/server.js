const express = require('express')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const flash = require('connect-flash')
const nunjucks = require('nunjucks')
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    // a ordem de chamada influencia na funcionalidade
    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions', 'session.json')
        }),
        saveUninitialized: true
      })
    )
  }

  views () {
    // configuração do nunjucks
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })
    // informa o express servir a aplicação com os arquivos publicos
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    // informa para o express que as views estarão em extensão njk
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

// exportando extancia do App com express
module.exports = new App().express
