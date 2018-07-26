import generateDefaults from '../db/defaults'

const tableName = 'counter_groups'
const primaryKeys = ['id']

export default {
  ...generateDefaults(tableName, primaryKeys)
}
