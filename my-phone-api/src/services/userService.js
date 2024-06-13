/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters';
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu 
    const newUser = {
      ...reqBody
    }
    //Gọi tới tầng Model để xử lý bản ghi newuser vào trong Db
    const createdUser = await userModel.createNew(newUser)
    console.log(createdUser)
    // Lấy bản ghi user sau khi gọi 

    const getNewUser = await userModel.findOneById(createdUser.insertedId)
    console.log(getNewUser)
    //Trả kết quả về, luôn phải có return trong service
    return getNewUser
  } catch (error) {
    throw error
  }
};

const getDetails = async (userId) => {
  try {
    const user = await userModel.getDetails(userId)
    if(!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'user not found')
    }
    return user
  } catch (error) {
    throw error
  }
};

export const userService = {
  createNew,
  getDetails
};
