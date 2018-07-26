import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import {
  queries as GroupQueries,
  mutations as GroupMutations
} from './group/schema'

import {
  queries as CounterQueries,
  mutations as CounterMutations
} from './counter/schema'

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: '...',

    fields: () => ({
      ...GroupMutations,
      ...CounterMutations
    })
  }),
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      ...GroupQueries,
      ...CounterQueries
    })
  })
})
