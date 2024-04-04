const insertEmptyModel = async (model, data) => {
  const count = await model.count()
  if (count) return
  await model.bulkCreate(data)
}

module.exports = insertEmptyModel
