const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDisabled: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        afterCreate: (user) => {
          delete user.dataValues.password
        },
        afterUpdate: (user) => {
          delete user.dataValues.password
        },
        afterSave: (user) => {
          delete user.dataValues.password
        },
      },
    }
  )
  return User
}
