const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const AudioType = sequelize.define('audioType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return AudioType
}
