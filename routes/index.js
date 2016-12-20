var express = require('express')
var router = express.Router()

router.get('/', (req, res) => res.render('index'))

// router.get('/', ensureAuthenticated, (req, res) => res.render('index'))
//
// function ensureAuthenticated (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   } else {
//     res.redirect('/')
//   }
// }

module.exports = router
