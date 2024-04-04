const STATUS = require('../constant/status')

const { COMMON_ERROR, SERVER_ERROR } = require('../types/error')
const { Audio, Playlist, User, UserHasPlaylists, PlaylistHasAudios } = require('../models/index')

const findByMe = async (request, response) => {
  try {
    const createdById = request.user.id
    const playlists = await Playlist.findAll({ where: { createdById }, include: [Audio, User] })

    return response.status(STATUS.SUCCESS).json(playlists)
  } catch (error) {
    console.log('playlist findByMe', error)
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const findAll = async (request, response) => {
  try {
    const playlists = await Playlist.findAll({ where: {}, include: [Audio, User] })
    if (!playlists) return response.status(COMMON_ERROR.NotFound.status).json(COMMON_ERROR.NotFound)

    return response.status(STATUS.SUCCESS).json(playlists)
  } catch (error) {
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const findById = async (request, response) => {
  try {
    const id = request.params.id

    const playlist = await Playlist.findOne({ where: { id }, include: [Audio, User] })
    if (!playlist) return response.status(COMMON_ERROR.NotFound.status).json(COMMON_ERROR.NotFound)

    return response.status(STATUS.SUCCESS).json(playlist)
  } catch (error) {
    console.log(error)
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError)
  }
}

const create = async (request, response) => {
  const { name } = request.body
  const createdById = request.user.id

  try {
    const playlist = await Playlist.create({
      name,
      createdById,
    })

    await UserHasPlaylists.create({ userId: createdById, playlistId: playlist.id })

    const result = await Playlist.findOne({
      where: {
        id: playlist.id,
      },
      include: [Audio, User],
    })

    return response.status(200).json(result)
  } catch (error) {
    console.log('error', error)
    return response.send(error)
  }
}

const update = async (request, response) => {
  const { name, playlistId } = request.body

  const createdById = request.user.id
  const playlist = await Playlist.findOne({ where: { id } })

  if (!playlist) return response.status(404).json(COMMON_ERROR.NotFound)
  if (playlist.createdById !== createdById) return response.status(403).json({ code: 'DONT_HAVE_PERMISSION' })

  const payload = {}

  if (name) payload.name = name

  try {
    await Playlist.update(payload, { where: { id: playlistId } })
    const playlistUpdate = await Playlist.findOne({ where: { id: playlistId }, include: [Audio] })

    return response.status(200).json(playlistUpdate)
  } catch (error) {
    return response.status(500).send(error)
  }
}

const deleteById = async (request, response) => {
  try {
    const id = request.params.id
    if (!id) return response.status(404).json({ message: 'Playlist not found' })

    await Playlist.destroy({ where: { id } })

    return response.status(200).json({ message: 'Success' })
  } catch (error) {
    return response.send(error)
  }
}

const addUser = async (request, response) => {
  try {
    const { userId, playlistId } = request.body
    await UserHasPlaylists.create({ userId, playlistId })
    const playlist = await Playlist.findOne({ where: { id: playlistId }, include: [Audio, User] })

    return response.status(200).json(playlist)
  } catch (error) {
    return response.status(500).send(error)
  }
}

const deleteUser = async (request, response) => {
  try {
    const { userId, playlistId } = request.body

    await UserHasPlaylists.destroy({ where: { userId, playlistId } })
    const playlist = await Playlist.findOne({ where: { id: playlistId }, include: [Audio, User] })

    return response.status(200).json(playlist)
  } catch (error) {
    console.log('deleteUser', error)
    return response.status(500).send(error)
  }
}

const addAudio = async (request, response) => {
  try {
    const { playlistId, audioId } = request.body
    await PlaylistHasAudios.create({ audioId, playlistId })
    const playlist = await Playlist.findOne({ where: { id: playlistId }, include: [Audio, User] })

    return response.status(200).json(playlist)
  } catch (error) {
    return response.status(500).send(error)
  }
}

const deleteAudio = async (request, response) => {
  try {
    const { audioId, playlistId } = request.body

    await PlaylistHasAudios.destroy({ where: { audioId, playlistId } })
    const playlist = await Playlist.findOne({ where: { id: playlistId }, include: [Audio, User] })

    return response.status(200).json(playlist)
  } catch (error) {
    console.log('deleteAudio', error)
    return response.status(500).send(error)
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  addUser,
  deleteUser,
  addAudio,
  deleteAudio,
  findByMe,
}
