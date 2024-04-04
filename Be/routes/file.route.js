const express = require('express')
const router = express.Router()

const fileServices = require('../services/file.services')

router.post('/', fileServices.create)

module.exports = router
