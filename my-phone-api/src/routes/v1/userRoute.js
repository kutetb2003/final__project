import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'
const Router = express.Router()

Router.route('/')
  .get(userController.getDetails)
  .post(userValidation.createNew, userController.createNew)

Router.route('/:id')
  .get(userController.getDetails)
  .put() //update data

export const userRoute = Router