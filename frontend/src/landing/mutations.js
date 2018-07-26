import gql from 'graphql-tag'

export const createGroup = gql`
  mutation createGroup($name: String!) {
    createGroup(name: $name) {
      id
    }
  }
`
