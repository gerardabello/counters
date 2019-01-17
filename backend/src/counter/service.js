import db from './db'

export const renameCounter = async (name, id) => {
  return db.update({
    id,
    name
  })
}

export const createCounter = async (name, groupId) => {
  const groupCounters = await db.getBy('groupId', groupId)

  return db.insert({
    name,
    groupId,
    index: groupCounters.length || 0
  })
}

export const incCounter = async id => {
  const counter = await db.get(id)
  return db.update({
    id,
    count: counter.count + 1
  })
}

export const decCounter = async id => {
  const counter = await db.get(id)
  return db.update({
    id,
    count: counter.count - 1
  })
}
