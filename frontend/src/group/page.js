import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'

import * as R from 'ramda'

import * as mutations from './mutations'
import * as queries from './queries'

import { colors } from 'components/variables'

import Container from 'components/container'
import Button from 'components/button'
import Spacer from 'components/spacer'
import Input from 'components/input'
import Text from 'components/text'

import { CounterItem } from './counter-item'

var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')))
var sortByIndex = R.sortBy(R.prop('index'))

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 475px;
`

const CountersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 80px;
`

class GroupPage extends Component {
  constructor (props) {
    super(props)

    this.state = { focusOnNewCounter: true }

    this.handleAddSubcounterClick = this.handleAddSubcounterClick.bind(this)
    this.handleIncCounter = this.handleIncCounter.bind(this)
    this.handleDecCounter = this.handleDecCounter.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return !nextProps.data.loading
  }

  handleAddSubcounterClick () {
    this.props.createCounter('New', this.props.groupId)
    this.focusOnNewCounter = true
  }

  handleNameChange (name, id) {
    this.props.renameCounter(name, id)
  }

  handleIncCounter (counterId) {
    this.props.incCounter(counterId)
  }

  handleDecCounter (counterId) {
    this.props.decCounter(counterId)
  }

  componentDidUpdate () {
    this.focusOnNewCounter = false
  }

  render () {
    const { group, loading } = this.props.data

    if (loading) return null

    const nCounters = group.counters.length
    const showName = nCounters > 1

    return (
      <Container>
        <Text size='size2'>{group.name}</Text>
        <Root>
          <CountersWrapper>
            {sortByIndex(group.counters).map((counter, i) => (
              <CounterItem
                key={counter.id}
                id={counter.id}
                name={counter.name}
                count={counter.count}
                onInc={this.handleIncCounter}
                onDec={this.handleDecCounter}
                onNameChange={name =>
                  this.props.renameCounter(name, counter.id)
                }
                focusOnNewCounter={
                  this.focusOnNewCounter && i === nCounters - 1
                }
                showName={showName}
              />
            ))}
          </CountersWrapper>

          <Spacer top={10} bottom={6}>
            <Button size='small' onClick={this.handleAddSubcounterClick}>
              <Text size='size0'>add subcounter</Text>
            </Button>
          </Spacer>
        </Root>
      </Container>
    )
  }
}

export default compose(
  graphql(queries.groupInfo, { options: { pollInterval: 2000 } }),
  graphql(mutations.incCounter, {
    props: ({ mutate, ownProps }) => ({
      incCounter: id =>
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            incCounter: {
              id,
              __typename: 'Counter',
              count:
                ownProps.data.group.counters.find(c => c.id === id).count + 1
            }
          }
        })
    })
  }),
  graphql(mutations.decCounter, {
    props: ({ mutate, ownProps }) => ({
      decCounter: id =>
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            decCounter: {
              id,
              __typename: 'Counter',
              count:
                ownProps.data.group.counters.find(c => c.id === id).count - 1
            }
          }
        })
    })
  }),
  graphql(mutations.createCounter, {
    props: ({ mutate }) => ({
      createCounter: (name, groupId) =>
        mutate({
          variables: { name, groupId }
        })
    }),
    options: props => ({
      refetchQueries: [
        {
          query: queries.groupInfo,
          variables: { groupId: props.groupId }
        }
      ]
    })
  }),
  graphql(mutations.renameCounter, {
    props: ({ mutate }) => ({
      renameCounter: (name, id) =>
        mutate({
          variables: { name, id }
        })
    }),
    options: props => ({
      refetchQueries: [
        {
          query: queries.groupInfo,
          variables: { groupId: props.groupId }
        }
      ]
    })
  })
)(GroupPage)
