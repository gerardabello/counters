import db from './db'
import { createCounter } from '../counter/service'

export const createGroup = async name => {
  const group = await db.insert({
    name
  })

  await createCounter('Default', group.id)

  return group
}
