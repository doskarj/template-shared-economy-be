export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const transformEnumToQLEnum = (enumaration) => {
  return Object.entries(enumaration).reduce((acc, cur) => {
    acc[cur[0]] = { value: cur[1] }
    return acc
  }, {})
}

export const transformMongoIdToId = (entity) => {
  if (!entity) return entity

  const newEntity = { ...entity._doc }

  delete newEntity['_id']
  newEntity['id'] = String(entity['_id'])

  return newEntity
}