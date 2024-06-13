import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError';
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang tầng Service
    const createdProduct = await userService.createNew(req.body)


    //Có kết quả thì return về Client
    res.status(StatusCodes.CREATED).json(createdProduct)
  } catch (error) {
    next(error)
  }
};

const getDetails = async (req, res, next) => {
  try {
    const userId = req.params.id

    const user = await userService.getDetails(userId)

    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
};
export const userController = {
  createNew,
  getDetails
}
