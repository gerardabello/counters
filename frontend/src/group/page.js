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

const Name = styled.div`
  flex: 1;
`

const CountersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 80px;
`

const CounterItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
`

const CountButtonWrapper = styled.div`
  display: flex;
  margin-left: 24px;
  cursor: pointer;
  user-select: none;
`

const CounterName = styled.div`
  text-align: right;
`

const Count = styled.div`
  color: ${colors.background};
  background: ${colors.body};
  height: 70px;
  display: flex;
  width: 96px;
  align-items: center;
  justify-content: center;

  @media (max-width: 550px) {
    height: 55px;
  }
`

class CounterNameInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: this.props.focusOnNewCounter,
      tempValue: props.value
    }

    this.handleNameClick = this.handleNameClick.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
  }

  componentDidMount () {
    if (this.state.editing) {
      this.input && this.input.focus()
      this.input && this.input.select()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.editing && !prevState.editing) {
      this.input && this.input.focus()
      this.input && this.input.select()
    }
  }

  handleNameClick () {
    this.setState({ editing: true, tempValue: this.props.value })
  }

  handleInputBlur () {
    this.setState({ editing: false })
    this.props.onChange(this.state.tempValue)
  }

  render () {
    const { value, onChange } = this.props

    if (this.state.editing) {
      return (
        <Input
          fullWidth
          fontSize='size1'
          getRef={r => (this.input = r)}
          onBlur={this.handleInputBlur}
          noBorder
          value={this.state.tempValue}
          textAlign='right'
          onChange={e => this.setState({ tempValue: e.target.value })}
        />
      )
    }

    return (
      <CounterName onClick={this.handleNameClick}>
        <Text size='size1'>{this.state.tempValue}</Text>
      </CounterName>
    )
  }
}

const CounterItem = ({
  name,
  count,
  focusOnNewCounter,
  showName,
  onInc,
  onNameChange
}) => (
  <CounterItemWrapper>
    {showName && (
      <Name>
        <CounterNameInput
          value={name}
          onChange={onNameChange}
          focusOnNewCounter={focusOnNewCounter}
        />
      </Name>
    )}
    <CountButtonWrapper onClick={onInc}>
      <Count>
        <Text size='size1'>{count}</Text>
      </Count>
      <Button size='icon'>+</Button>
    </CountButtonWrapper>
  </CounterItemWrapper>
)

class GroupPage extends Component {
  constructor (props) {
    super(props)

    this.state = { focusOnNewCounter: true }

    this.handleAddSubcounterClick = this.handleAddSubcounterClick.bind(this)
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
                name={counter.name}
                count={counter.count}
                onInc={() => this.props.incCounter(counter.id)}
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
  graphql(queries.groupInfo),
  graphql(mutations.incCounter, {
    props: ({ mutate }) => ({
      incCounter: id =>
        mutate({
          variables: { id }
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
