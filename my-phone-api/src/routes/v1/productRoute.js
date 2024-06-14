import express from 'express'
import { StatusCodes } from 'http-status-codes'
import {productValidation} from '~/validations/productValidation'
import { productController } from '~/controllers/productController'
const Router = express.Router()

Router.route('/')
  .get(productController.getAll)
  .post(productValidation.createNew, productController.createNew)

Router.route('/:id')
  .get(productController.getDetails)
  .put() //update data
export const productRoute = Router