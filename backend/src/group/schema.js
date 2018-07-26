import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import * as R from 'ramda'

import db from './db'
import dbCounter from '../counter/db'
import { createGroup } from './service'
import { Type as CounterType } from './../counter/schema'

export const Type = new GraphQLObjectType({
  name: 'Group',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: R.prop('name')
    },
    counters: {
      type: new GraphQLList(CounterType),
      resolve: group => {
        return dbCounter.getBy('groupId', group.id)
      }
    },
    id: {
      type: GraphQLString,
      resolve: R.prop('id')
    }
  })
})

export const queries = {
  group: {
    type: Type,
    args: {
      id: { type: GraphQLString }
    },
    resolve: (root, args) => {
      return db.get(args.id)
    }
  }
}

export const mutations = {
  createGroup: {
    type: Type,
    args: {
      name: { type: GraphQLString }
    },
    resolve: async (root, { name }) => {
      return createGroup(name)
    }
  }
}
