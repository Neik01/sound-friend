const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const File = sequelize.define('file', {
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })

  return File
}
