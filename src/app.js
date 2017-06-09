// const bodyParser = require('body-parser')
const coffeeMiddleware = require('coffee-middleware')
// const cookieParser = require('cookie-parser')
const express = require('express')
const helmet = require('helmet')
// const favicon = require('serve-favicon')
// const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')
const path = require('path')

process.on('uncaughtException', console.error)

const routes = require('./routes/index')
// const users = require('./routes/users')

const app = express()
app.set('view engine', 'pug')
app.set('views', './src/resources/views')
app.use(sassMiddleware({
  src: 'src/resources',
  dest: './public',
  debug: false,
  indentedSyntax: true,
  outputStyle: 'compressed'
}))
app.use(coffeeMiddleware({
  compress: true,
  debug: false,
  src: 'src/resources'
}))

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())

app.use('/', routes)
// app.use('/users', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  if (app.get('env') === 'development') {
    res.render('error', { error: err })
  } else {
    res.render('error', { error: { message: err.msg } })
  }
  next()
})

module.exports = app
