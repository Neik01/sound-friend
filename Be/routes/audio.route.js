const express = require('express')
const router = express.Router()

const audioServices = require('../services/audio.services')
const authServices = require('../services/auth.services')

router.post('/find-all', audioServices.findAll)

router.post('/', authServices.authJwt, audioServices.create)

router.get('/:id', authServices.authJwt, audioServices.findById)

router.put('/', authServices.authJwt, audioServices.update)

router.delete('/:id', authServices.authJwt, audioServices.deleteById)

module.exports = router
