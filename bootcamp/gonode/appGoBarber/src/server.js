const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const nunjucks = require('nunjucks')
const flash = require('connect-flash')
const path = require('path') // helps navigate between the folders of our project

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production' // verifies if it is in prod or in dev environment

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
        store: new RedisStore({
          host: 'localhost',
          port: 6379,
          ttl: 1800
        }),
        secret: 'MyAppSecret',
        resave: false,
        saveUninitialized: false //* creates a session even if it's not logged in => empty session
      })
    )
  }
  views () {
    // from __dirname search for app and inside that there is views
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })
    this.express.use(express.static(path.resolve(__dirname, 'public'))) // lets public folder be served by express
    this.express.set('view engine', 'njk')
  }
  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
