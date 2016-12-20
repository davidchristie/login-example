const bcrypt = require('bcrypt')
const knex = (environment => {
  const config = require('./knexfile')[environment]
  return require('knex')(config)
})(process.env.NODE_ENV || 'development')

const saltRounds = 10

function comparePassword (password, hash) {
  return bcrypt.compare(password, hash)
}

function createUser (user) {
  return bcrypt.hash(user.password, saltRounds).then(hash => {
    return knex('users').insert({
      email: user.email,
      password: hash,
      name: user.name
    })
  })
}

function getUserByEmail (email) {
  return knex('users').where('email', email).first()
}

function getUserById (id) {
  return knex('users').where('id', id).first()
}

module.exports = {
  comparePassword,
  createUser,
  getUserByEmail,
  getUserById
}
