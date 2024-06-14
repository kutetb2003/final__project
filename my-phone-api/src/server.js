/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from './config/environment'
import exitHook from 'async-exit-hook'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
const START_SERVER = () => {
  const app = express()
  app.use(cors())
  // Chuyển req thành json
  app.use(express.json())
  // Use APIs v1
  app.use('/v1', APIs_V1)
  //midlewares for bugs
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Smeap, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
  exitHook(() => {
    console.log('Closing db');
    CLOSE_DB();
    console.log('Closed db');
  })
}

(async () => {
  try {
    console.log('Connecting to MongoDB Cloud Atlas')
    await CONNECT_DB()
    console.log('Connected to Database Atlas')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
