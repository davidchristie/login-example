const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')

const passport = require('./passport')
const routes = require('./routes/index')
const users = require('./routes/users')

const app = express()

// MIDDLEWARE

app.use(express.static('public'))

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// connect-flash
app.use(flash())

// cookie-parser
app.use(cookieParser())

// handlebars
app.engine('hbs', handlebars({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

// express-session
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}))

// express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    }
  }
}))

// passport
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

app.use('/', routes)
app.use('/users', users)

module.exports = app
