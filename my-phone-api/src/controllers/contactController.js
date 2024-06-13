import { StatusCodes } from 'http-status-codes'
import { contactService } from '~/services/contactService'

const createNew = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang tầng Service
    const createdContact = await contactService.createNew(req.body)


    //Có kết quả thì return về Client
    res.status(StatusCodes.CREATED).json(createdContact)
  } catch (error) {
    next(error)
  }
};

const getDetails = async (req, res, next) => {
  try {
    const contactId = req.params.id

    const contact = await contactService.getDetails(contactId)

    res.status(StatusCodes.OK).json(contact)
  } catch (error) {
    next(error)
  }
};
export const contactController = {
  createNew,
  getDetails
}
