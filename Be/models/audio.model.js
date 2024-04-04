const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Audio = sequelize.define('audio', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  return Audio
}
