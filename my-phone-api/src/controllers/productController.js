import { StatusCodes } from 'http-status-codes'
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

const putNewReview = async (req, res, next) => {
  try {
    const { productId, reviewerName, content, email, rating } = req.body;
    console.log('req.body : ' ,req.body)
    const reviewData = {
      reviewerName,
      content,
      email,
      rating
    };
    const result = await productService.putNewReview(productId, reviewData);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
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
    const { brand ,_start, _limit } = req.query
    const start = _start ? parseInt(_start, 10) : undefined
    const limit = _limit ? parseInt(_limit, 10) : undefined
    const products = await productService.getAll({brand , _start, _limit})
    // console.log('brand : ' + brand + ' start ' + _start + ' _limit ' + _limit)
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createNew,
  getDetails,
  putNewReview,
  getAll
}
