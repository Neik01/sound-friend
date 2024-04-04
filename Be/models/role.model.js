const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return Role
}
