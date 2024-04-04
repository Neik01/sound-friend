const models = require('../models/index')
const { USER_SUCCESS } = require('../types/success')
const { COMMON_ERROR, SERVER_ERROR } = require('../types/error')
const STATUS = require('../constant/status')
const Role = models.role
const User = models.user

const create = async (request, response) => {
  try {
    const name = request.body.name
    const role = await Role.create({ name })
    return response.status(STATUS.SUCCESS).json(role)
  } catch (error) {
    consola.error(new Error('Error', error))
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const findAll = async (request, response) => {
  try {
    const roles = await Role.findAll()
    return response.status(STATUS.SUCCESS).json(roles)
  } catch (error) {
    consola.error(new Error('Error', error))
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const softDelete = async (request, response) => {}

const changeRole = async (request, response) => {
  try {
    const user_id = request.body.user_id
    const role_id = request.body.role_id

    await User.update(
      {
        role_id: role_id,
      },
      {
        where: { id: user_id, is_deleted: 0 },
      }
    )
    return response.status(USER_SUCCESS.changeRole.status).json(USER_SUCCESS.changeRole)
  } catch (error) {
    consola.error(new Error('Error', error))
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

module.exports = {
  findAll,
  create,
  softDelete,
  changeRole,
}
