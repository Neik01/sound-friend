const express = require('express')
const router = express.Router()

const userServices = require('../services/user.services')
const authServices = require('../services/auth.services')

router.get('/user', authServices.authJwt, userServices.findAll)

router.put('/user', authServices.authJwt, userServices.update)

// router.delete('/:id', authServices.authJwt, authServices.authRole, userServices.softDelete)

router.get('/me', authServices.authJwt, userServices.me)

router.post('/register', userServices.register)

router.post('/login', userServices.login)

module.exports = router
