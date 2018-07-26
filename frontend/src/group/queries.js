import gql from 'graphql-tag'

export const groupInfo = gql`
  query($groupId: String!) {
    group(id: $groupId) {
      id
      name
      counters {
        id
        name
        count
        index
      }
    }
  }
`
