import { StatusCodes } from "http-status-codes";
import { contactService } from "~/services/contactService";

const createNew = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang tầng Service
    const createdContact = await contactService.createNew(req.body);

    //Có kết quả thì return về Client
    res.status(StatusCodes.CREATED).json(createdContact);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const contactId = req.params.id;

    const contact = await contactService.getDetails(contactId);

    res.status(StatusCodes.OK).json(contact);
  } catch (error) {
    next(error);
  }
};
// const getAll = async () => {
//   try {
//     const response = await contactService.getAll();
//     console.log('controller is here')
//     console.log('controller response', response);
//     return response;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
const getAll = async (req, res, next) => {
  try {
    const response = await contactService.getAll();
    console.log('controller response', response);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export const contactController = {
  createNew,
  getDetails,
  getAll,
};
