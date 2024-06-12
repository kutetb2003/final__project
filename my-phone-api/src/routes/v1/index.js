import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRoutes } from './productRoutes'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({message : 'NOTE: APIs ready to use'})
})
/** Products api */
Router.use('/products', productRoutes)

export const APIs_V1 = Router