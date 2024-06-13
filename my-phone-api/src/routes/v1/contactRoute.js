import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { contactValidation} from '~/validations/contactValidation'
import { contactController } from '~/controllers/contactController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message : 'GET/route:  API get list contacts'})
  })
  .post(contactValidation.createNew, contactController.createNew)

Router.route('/:id')
  .get(contactController.getDetails)
  .put() //update data

export const contactRoute = Router