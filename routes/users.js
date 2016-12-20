const express = require('express')
const passport = require('passport')
const router = express.Router()

const db = require('../db')

router.get('/join', (req, res) => { res.render('join') })
// router.get('/login', (req, res) => { res.render('login') })

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'back',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/')
  })

router.post('/join', function(req, res){

  // validation
  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password)

  const errors = req.validationErrors()

  if (errors) {
    res.render('join', {errors: errors})
  } else {
    db.createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }).then(() => {
      req.flash('success_msg', 'You are registered and can now login')
      res.redirect('/')
    })
  }
})

module.exports = router
