import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql'
import * as R from 'ramda'

import db from './db'
import { createCounter, incCounter, renameCounter } from './service'

export const Type = new GraphQLObjectType({
  name: 'Counter',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: R.prop('name')
    },
    count: {
      type: GraphQLInt,
      resolve: R.prop('count')
    },
    index: {
      type: GraphQLInt,
      resolve: R.prop('index')
    },
    id: {
      type: GraphQLString,
      resolve: R.prop('id')
    }
  })
})

export const queries = {
  counter: {
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
  createCounter: {
    type: Type,
    args: {
      groupId: { type: GraphQLString },
      name: { type: GraphQLString }
    },
    resolve: async (root, { groupId, name }) => {
      return createCounter(name, groupId)
    }
  },
  renameCounter: {
    type: Type,
    args: {
      id: { type: GraphQLString },
      name: { type: GraphQLString }
    },
    resolve: async (root, { id, name }) => {
      return renameCounter(name, id)
    }
  },
  incCounter: {
    type: Type,
    args: {
      id: { type: GraphQLString }
    },
    resolve: async (root, { id }) => {
      return incCounter(id)
    }
  }
}
