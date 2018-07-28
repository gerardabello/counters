import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { compose } from 'ramda'

import { withRouter } from 'react-router-dom'

import Container from 'components/container'
import Distribute from 'components/distribute'
import Text from 'components/text'
import Input from 'components/input'
import Button from 'components/button'
import Logo from 'components/logo'
import Spacer from 'components/spacer'

import * as mutations from './mutations'

const Root = styled.div`
  height: 100%;
`

const InnerContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 15vh;
`

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = { groupName: '' }

    this.handleButtonClick = this.handleButtonClick.bind(this)

    this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
  }

  handleButtonClick () {
    this.props.createGroup(this.state.groupName)
  }

  handleInputKeyDown (e) {
    if (e.keyCode == 13) {
      e.preventDefault()
      e.stopPropagation()
      this.props.createGroup(this.state.groupName)
    }
  }

  render () {
    return (
      <Container>
        <Root>
          <Logo />
          <InnerContainer>
            <Distribute vertical align='center' space={6}>
              <Text size='size1'>What do you want to count?</Text>
              <Input
                fullWidth
                fontSize='size1'
                value={this.state.groupName}
                onChange={e => this.setState({ groupName: e.target.value })}
                onKeyDown={this.handleInputKeyDown}
              />
              <Button black size='large' onClick={this.handleButtonClick}>
                create
              </Button>
            </Distribute>
          </InnerContainer>
        </Root>
      </Container>
    )
  }
}

export default compose(
  withRouter,
  graphql(mutations.createGroup, {
    props: ({ mutate }) => ({
      createGroup: name => mutate({ variables: { name } })
    }),
    options: props => ({
      onCompleted: ({ createGroup }) => {
        props.history.push(`/counter/${createGroup.id}`)
      }
    })
  })
)(Home)
