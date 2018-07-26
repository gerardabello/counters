import 'web-animations-js'

import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import Landing from './landing'
import Group from './group/page'

import createApolloClient from './state/server/create-apollo-client'

import {
  textSizes,
  lineHeights,
  fontFamily,
  colors
} from '../components/variables'

const history = createBrowserHistory()

const client = createApolloClient()

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Karla:700');

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    font-family: ${fontFamily};
    ${textSizes.size0};
    color: ${colors.body};
    background: ${colors.background};
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          component={props => <Landing history={props.history} />}
        />
        <Route
          exact
          path='/counter/:id'
          component={props => (
            <Group groupId={props.match.params.id} history={props.history} />
          )}
        />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
