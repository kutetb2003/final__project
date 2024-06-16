import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { contactValidation} from '~/validations/contactValidation'
import { contactController } from '~/controllers/contactController'
const Router = express.Router()

Router.route('/')
  .get(contactController.getAll)
  .post(contactValidation.createNew, contactController.createNew)

Router.route('/:id')
  .get(contactController.getDetails)
  .put() //update data

export const contactRoute = Router