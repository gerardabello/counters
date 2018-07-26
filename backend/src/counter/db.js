import generateDefaults from '../db/defaults'

const tableName = 'counters'
const primaryKeys = ['id']

export default {
  ...generateDefaults(tableName, primaryKeys)
}
