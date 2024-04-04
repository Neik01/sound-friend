const sequelize = require('sequelize')
const STATUS = require('../constant/status')

const { COMMON_ERROR, SERVER_ERROR } = require('../types/error')
const { Audio, AudioType, File, AudioHasTypes, Comment } = require('../models/index')

const findAll = async (request, response) => {
  const page_size = +request.body.page_size || 1000
  const page = +request.body.page || 1
  const offset = (page - 1) * page_size

  try {
    const query = request.body?.query
    const queryCache = Object.assign({}, query)

    if (query && query.name) {
      query.name = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        'LIKE',
        '%' + query.name.toLowerCase() + '%'
      )
    }

    if (query.audioTypeIds) {
      delete query.audioTypeIds
    }

    const [counts, audios] = await Promise.all([
      Audio.count({
        where: { ...queryCache },
        include: [
          File,
          { model: AudioType, where: { ...(queryCache.audioTypeIds ? { id: queryCache.audioTypeIds } : {}) } },
          Comment,
        ],
      }),
      Audio.findAll({
        where: { ...query },
        include: [
          File,
          { model: AudioType, where: { ...(queryCache.audioTypeIds ? { id: queryCache.audioTypeIds } : {}) } },
          Comment,
        ],
        order: [['createdAt', 'DESC']],
        offset,
        limit: page_size,
      }),
    ])

    const total_page = Math.ceil(counts / page_size)

    return response.status(200).json({ data: audios, page, page_size, total_page })
  } catch (error) {
    console.log('Audio findAll', error)
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const findById = async (request, response) => {
  try {
    const id = request.params.id

    const audio = await Audio.findOne({ where: { id }, include: [File, AudioType, Comment] })
    if (!audio) return response.status(COMMON_ERROR.NotFound.status).json(COMMON_ERROR.NotFound)

    return response.status(STATUS.SUCCESS).json(audio)
  } catch (error) {
    consola.error('Audio findById', error)
    response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const findByName = async (request, response) => {
  try {
    const name = request.query.name
    const role = request.user.role.name
    const payload = {
      name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%'),
      is_deleted: 0,
    }
    if (role !== 'admin') payload.user_id = request.user.id
    const files = await File.findAll({
      where: payload,
    })
    return response.status(STATUS.SUCCESS).json(files)
  } catch (error) {
    consola.error(new Error('Error', error))
    response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const create = async (request, response) => {
  const { name, description, fileId, audioTypeIds } = request.body
  const createdById = request.user.id

  try {
    const audio = await Audio.create({
      name,
      description,
      createdById,
      fileId,
    })

    await AudioHasTypes.bulkCreate(audioTypeIds.map((id) => ({ audioTypeId: id, audioId: audio.dataValues.id })))

    const result = await Audio.findOne({
      where: {
        id: audio.id,
      },
      include: [File, AudioType],
    })

    return response.status(200).json(result)
  } catch (error) {
    console.log('error', error)
    return response.send(error)
  }
}

const update = async (request, response) => {
  const { id, description, audioTypeId, name } = request.body

  const createdById = request.user.id
  const audio = await Audio.findOne({ where: { id } })

  if (!audio) return response.status(404).json(COMMON_ERROR.NotFound)
  if (audio.createdById !== createdById) return response.status(403).json({ code: 'DONT_HAVE_PERMISSION' })

  const payload = {}

  if (description) payload.description = description
  if (audioTypeId) payload.audioTypeId = audioTypeId
  if (name) payload.name = name

  try {
    await Audio.update(payload, { where: { id }, include: [File, AudioType] })
    const audioUpdate = await Audio.findOne({ where: { id }, include: [File, AudioType] })

    return response.status(200).json(audioUpdate)
  } catch (error) {
    return response.status(500).send(error)
  }
}

const deleteById = async (request, response) => {
  try {
    const id = request.params.id
    if (!id) return response.status(404).json({ message: 'Audio not found' })

    const userId = request.user.id
    const audio = await Audio.findOne({ where: { id } })
    if (!audio) return response.status(404).json({ message: 'Audio not found' })
    if (audio.createdById !== userId) return response.status(403).json({ message: 'Permission denied' })

    await Audio.destroy({ where: { id } })

    return response.status(200).json({ message: 'Success' })
  } catch (error) {
    return response.send(error)
  }
}

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  update,
  deleteById,
}
