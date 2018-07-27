import React, { Component } from 'react'
import styled from 'styled-components'

import { colors } from 'components/variables'

import Container from 'components/container'
import Button from 'components/button'
import Spacer from 'components/spacer'
import Input from 'components/input'
import Text from 'components/text'

const Name = styled.div`
  flex: 1;
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

export const CounterItem = ({
  name,
  count,
  focusOnNewCounter,
  showName,
  onInc,
  id,
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
    <CountButtonWrapper onClick={() => onInc(id)}>
      <Count>
        <Text size='size1'>{count}</Text>
      </Count>
      <Button size='icon'>+</Button>
    </CountButtonWrapper>
  </CounterItemWrapper>
)
