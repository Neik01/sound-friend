const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const { SERVER_ERROR, AUTH_ERROR } = require('../types/error')
const { User, Role } = require('../models/index')

const authJwt = async (request, response, next) => {
  try {
    const token = request.headers?.authorization?.split(' ')[1]
    if (!token) return response.status(AUTH_ERROR.JwtVerify.status).json(AUTH_ERROR.JwtVerify)
    await jwt.verify(token, jwtSecret, async (error, verify) => {
      if (error) return response.status(401).json({ message: 'Token expired' })
      if (!verify || error) return response.status(AUTH_ERROR.JwtVerify.status).json(AUTH_ERROR.JwtVerify)

      const user = await User.findOne({
        where: { id: verify.id },
        attributes: {
          exclude: ['password'],
        },
        // include: [Role],
      })

      if (!user) return response.status(AUTH_ERROR.JwtVerify.status).json(AUTH_ERROR.JwtVerify)
      request.user = user
      next()
    })
  } catch (error) {
    console.log('authJwt error', error)
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const authRole = async (request, response, next) => {
  try {
    const role = await Role.findOne({ where: { name: 'admin' }, attributes: ['id'] })
    if (!role) return response.status(AUTH_ERROR.RoleVerify.status).json(AUTH_ERROR.RoleVerify)

    const user = request.user
    if (user.role.id !== role.id) return response.status(AUTH_ERROR.RoleVerify.status).json(AUTH_ERROR.RoleVerify)

    request.user = user
    next()
  } catch (error) {
    console.log('authRole error', error)
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

module.exports = {
  authJwt,
  authRole,
}
