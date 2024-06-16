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
    const { userName, password } = req.query;
    console.log(req.query, 'query');

    // Giả định bạn có một hàm trong userService để xác thực người dùng
    const user = await userService.findUserByUserName(userName);

    if (user && user.password === password) {
      return res.status(StatusCodes.OK).json({ message: 'Login successful', user });
    } else {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    next(error);
  }
};
export const userController = {
  createNew,
  getDetails
}
