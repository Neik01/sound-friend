const express = require('express')
const router = express.Router()

const commentServices = require('../services/comment.services')

router.post('/', commentServices.create)

router.put('/', commentServices.update)

router.delete('/:id', commentServices.deleteById)

module.exports = router
