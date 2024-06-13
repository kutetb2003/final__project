import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError';
import { productService } from '~/services/productService'

const createNew = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang tầng Service
    const createdProduct = await productService.createNew(req.body)


    //Có kết quả thì return về Client
    res.status(StatusCodes.CREATED).json(createdProduct)
  } catch (error) {
    next(error)
  }
};

const getDetails = async (req, res, next) => {
  try {
    const productId = req.params.id

    const product = await productService.getDetails(productId)

    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    next(error)
  }
};

const getAll = async (req, res, next) => {
  try {
    const products = await productService.getAll()
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    next(error)
  }
}
export const productController = {
  createNew,
  getDetails,
  getAll
}
