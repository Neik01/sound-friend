const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const consola = require('consola')

const app = express()

require('dotenv').config()

const corsOrigin = {
  origin: '*',
}

const PORT = +process.env.PORT || 3001

const userRoute = require('./routes/user.route')
const fileRoute = require('./routes/file.route')
const audioRoute = require('./routes/audio.route')
const commentRoute = require('./routes/comment.route')
const playlistRoute = require('./routes/playlist.route')

const authServices = require('./services/auth.services')

//allow cors origin for all client
app.use(cors(corsOrigin))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// user for files
app.use('/public', express.static('public'))

app.use('/', userRoute)
app.use('/file', authServices.authJwt, fileRoute)
app.use('/audio', audioRoute)
app.use('/comment', authServices.authJwt, commentRoute)
app.use('/playlist', authServices.authJwt, playlistRoute)

app.listen(PORT, () => {
  consola.success(`Api gateway http://localhost:${PORT}`)

  const models = require('./models/index')

  try {
    setTimeout(async () => {
      let audioTypes = await models.AudioType.findOne()
      if (audioTypes) return
      const audioTypeNames = [
        'R & B',
        'Pop',
        'Ballad',
        'House',
        'Vinahouse',
        'EDM',
        'Nhạc trữ tình',
        'Nhạc quê hương',
        'Bolero',
        'K-Pop',
        'US-UK',
      ]

      audioTypes = audioTypeNames.map((type) => ({ name: type }))
      await models.AudioType.bulkCreate(audioTypes)
    }, 1 * 1000)
  } catch (error) {
    console.log('app listen error', error)
  }
})
