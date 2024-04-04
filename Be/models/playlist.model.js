const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Playlist = sequelize.define('playlist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  return Playlist
}
