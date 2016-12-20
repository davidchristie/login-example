const LocalStrategy = require('passport-local').Strategy

const db = require('../db')

module.exports = new LocalStrategy({
  usernameField: 'email'
},
(email, password, done) => {
  db.getUserByEmail(email)
    .then(user => {
      db.comparePassword(password, user.password)
        .then(matches => {
          if (matches) {
            return done(null, user)
          } else {
            return done(null, false, {message: 'Invalid password'})
          }
        })
        .catch(err => done(err))
    })
    .catch(err => done(err))
})
