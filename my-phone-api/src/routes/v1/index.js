import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRoute } from './productRoute'
import { contactRoute} from '~/routes/v1/contactRoute'
import { userRoute } from '~/routes/v1/userRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({message : 'NOTE: APIs ready to use'})
})
/** Products api */
Router.use('/products', productRoute)
/** Contacts api */
Router.use('/contacts', contactRoute)
/** Users api*/
Router.use('/users', userRoute)
// Router.use('/users', userRoute )
export const APIs_V1 = Router
