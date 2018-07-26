import gql from 'graphql-tag'

export const incCounter = gql`
  mutation incCounter($id: String!) {
    incCounter(id: $id) {
      count
    }
  }
`

export const createCounter = gql`
  mutation createCounter($name: String!, $groupId: String!) {
    createCounter(name: $name, groupId: $groupId) {
      id
      name
      count
    }
  }
`

export const renameCounter = gql`
  mutation renameCounter($name: String!, $id: String!) {
    renameCounter(name: $name, id: $id) {
      id
      name
    }
  }
`
