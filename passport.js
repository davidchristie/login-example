const passport = require('passport')

const db = require('./db')
const local = require('./stategies/local.js')

passport.deserializeUser(function(id, done) {
  db.getUserById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
})

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.use(local)

module.exports = passport
