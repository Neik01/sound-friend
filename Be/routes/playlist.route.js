const express = require('express')
const router = express.Router()

const playlistServices = require('../services/playlist.services')

router.get('/', playlistServices.findAll)

router.get('/:id', playlistServices.findById)

router.post('/me', playlistServices.findByMe)

router.post('/', playlistServices.create)

router.put('/', playlistServices.update)

router.delete('/:id', playlistServices.deleteById)

router.post('/user', playlistServices.addUser)

router.delete('/user', playlistServices.deleteUser)

router.post('/audio', playlistServices.addAudio)

router.delete('/audio', playlistServices.deleteAudio)

module.exports = router
