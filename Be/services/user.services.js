const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role } = require('../models/index')
const { COMMON_ERROR, SERVER_ERROR, USER_ERROR } = require('../types/error')
const STATUS = require('../constant/status')

const saltRounds = +process.env.SALT_ROUNDS || 16
const jwtSecret = process.env.JWT_SECRET

const ROLE = require('../constant/role')

const register = async (request, response) => {
  try {
    const username = request.body.username
    const password = request.body.password

    if (!username || username.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter)
    if (!password || password.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter)

    //hasspass here
    const existUser = await User.findOne({ where: { username, isDisabled: false } })
    if (!!existUser) return response.status(USER_ERROR.UserExist.status).json(USER_ERROR.UserExist)

    const hashPassword = await bcrypt.hash(password, saltRounds)

    const user = await User.create({ username: username, password: hashPassword, role_id: ROLE.USER.id })
    console.log('user: ', user)
    return response.status(STATUS.SUCCESS).json(user)
  } catch (error) {
    consola.error(new Error('Error', error))
    response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const login = async (request, response) => {
  try {
    const username = request.body.username
    const password = request.body.password

    if (!username || username.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter)
    if (!password || password.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter)

    const user = await User.findOne({ where: { username: username, isDisabled: false } })
    if (!user) return response.status(USER_ERROR.UserNotExist.status).json(USER_ERROR.UserNotExist)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return response.status(USER_ERROR.PasswordWrong.status).json(USER_ERROR.PasswordWrong)
    }

    const token = await jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '7d' })

    return response.status(STATUS.SUCCESS).json({ token: token })
  } catch (error) {
    consola.error(new Error('Error', error))
    response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const softDelete = async (request, response) => {}

const findAll = async (request, response) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ['password', 'token'],
      },
      include: [Role],
      where: {
        is_deleted: 0,
      },
    })
    return response.status(STATUS.SUCCESS).json(user)
  } catch (error) {
    consola.error(new Error('Error', error))
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const update = async (request, response) => {
  try {
    const id = request.user.id
    const description = request.body.description
    await User.update(
      {
        description,
      },
      {
        where: { id, is_deleted: 0 },
      }
    )
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    })
    return response.status(STATUS.SUCCESS).json(user)
  } catch (error) {
    consola.error(new Error('Error', error))
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const me = async (request, response) => {
  try {
    const user = request.user
    return response.status(STATUS.SUCCESS).json(user)
  } catch (error) {
    consola.error(new Error('Error', error))
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

module.exports = {
  register,
  softDelete,
  login,
  me,
  findAll,
  update,
}
