const { Audio, Comment } = require('../models/index')

const findAll = async (request, response) => {}

const findById = async (request, response) => {}

const findByName = async (request, response) => {}

const create = async (request, response) => {
  const { content, audioId } = request.body
  const createdById = request.user.id
  if (!audioId) return response.status(404).json({ message: 'Audio not found' })
  const audio = await Audio.findOne({ where: { id: audioId } })
  if (!audio) return response.status(404).json({ message: 'Audio not found' })

  try {
    const comment = await Comment.create({
      content,
      audioId,
      createdById,
    })

    return response.status(200).json(comment)
  } catch (error) {
    console.log('error', error)
    return response.send(error)
  }
}

const update = async (request, response) => {
  const { content, commentId } = request.body
  if (!commentId) return response.status(404).json({ message: 'Comment not found' })
  const comment = await Comment.findOne({ where: { id: commentId } })
  if (!comment) return response.status(404).json({ message: 'Comment not found' })

  try {
    await Comment.update(
      {
        content,
      },
      { where: { id: commentId } }
    )

    const comment = await Comment.findOne({ where: { id: commentId } })

    return response.status(200).json(comment)
  } catch (error) {
    console.log('error', error)
    return response.send(error)
  }
}

const deleteById = async (request, response) => {
  try {
    const id = request.params.id
    if (!id) return response.status(404).json({ message: 'Comment not found' })

    await Comment.destroy({ where: { id } })

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
