import * as db from './db'
import myGraphQLSchema from './schema'

import migrate from '../migrate'

const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const graphqlHTTP = require('express-graphql')

require('dotenv').config()

console.log(
  `Connecting to db: ${process.env.DB_USER}@${process.env.DB_HOST}:${
    process.env.DB_PORT
  }`
)

// Force crash on unhandled rejections instead of silently ignoring them.
// In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const main = async _ => {
  await migrate()
  console.log('Finished migration')

  db.init({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'counters',
    port: process.env.DB_PORT
  })

  const app = express()
  app.use(bodyParser.json())
  app.use(cors())

  app.use(
    '/graphql',
    graphqlHTTP(async (request, response, graphQLParams) => ({
      schema: myGraphQLSchema,
      graphiql: true,
      formatError: error => ({
        message: error.message,
        details: error.stack
      })
    }))
  )

  console.log('Starting server...')
  app.listen(5050)
}

main()
