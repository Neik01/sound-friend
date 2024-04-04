const config = require('../config/mysql.config')
const { Sequelize } = require('sequelize')

const models = {}

const { database, user, password, dialect, timezone } = config

const sequelize = new Sequelize(database, user, password, {
  dialect,
  logging: false,
  timezone,
})

models.sequelize = sequelize

models.AudioType = require('./audio_type.model')(sequelize)
models.Audio = require('./Audio.model')(sequelize)
models.Comment = require('./Comment.model')(sequelize)
models.File = require('./File.model')(sequelize)
models.Playlist = require('./Playlist.model')(sequelize)
models.Role = require('./Role.model')(sequelize)
models.User = require('./User.model')(sequelize)

// define relations

// User Many To Many Role
models.User.belongsToMany(models.Role, { through: 'userHasRoles' })
models.Role.belongsToMany(models.User, { through: 'userHasRoles' })

//  Audio Many To Many AudioType
const AudioHasTypes = sequelize.define('audioHasTypes')
models.AudioHasTypes = AudioHasTypes
models.Audio.belongsToMany(models.AudioType, { through: AudioHasTypes })
models.AudioType.belongsToMany(models.Audio, { through: AudioHasTypes })

//  Audio Many To Many Playlist
const PlaylistHasAudios = sequelize.define('playlistHasAudios')
models.PlaylistHasAudios = PlaylistHasAudios
models.Playlist.belongsToMany(models.Audio, { through: PlaylistHasAudios })
models.Audio.belongsToMany(models.Playlist, { through: PlaylistHasAudios })

// User  Many To Many Playlist
const UserHasPlaylists = sequelize.define('userHasPlaylists')
models.UserHasPlaylists = UserHasPlaylists
models.User.belongsToMany(models.Playlist, { through: UserHasPlaylists })
models.Playlist.belongsToMany(models.User, { through: UserHasPlaylists })

// Comment One To Many Comment
models.Audio.hasMany(models.Comment)
models.Comment.belongsTo(models.Audio)

// File one to one Audio
models.File.hasOne(models.Audio)
models.Audio.belongsTo(models.File)

models.sequelize.sync({ force: false })

module.exports = models
