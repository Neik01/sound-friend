const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Cpmment = sequelize.define('comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    audioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  return Cpmment
}
