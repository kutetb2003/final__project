/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters';
import { contactModel } from '~/models/contactModel'
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu 
    const newContact= {
      ...reqBody
    }
    //Gọi tới tầng Model để xử lý bản ghi newProduct vào trong Db
    const createdContact = await contactModel.createNew(newContact)
    console.log(createdContact)
    // Lấy bản ghi contact sau khi gọi 

    const getNewContact = await contactModel.findOneById(createdContact.insertedId)
    console.log(getNewContact)
    //Trả kết quả về, luôn phải có return trong service
    return getNewContact
  } catch (error) {
    throw error
  }
};

const getDetails = async (contactId) => {
  try {
    const contact = await contactModel.getDetails(contactId)
    if(!contact) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Contact not found')
    }
    return contact
  } catch (error) {
    throw error
  }
};
export const contactService = {
    createNew,
    getDetails
};
  