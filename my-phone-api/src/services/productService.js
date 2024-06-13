/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters';
import { productModel } from '~/models/productModel'
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu 
    const newProduct = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //Gọi tới tầng Model để xử lý bản ghi newProduct vào trong Db
    const createdProduct = await productModel.createNew(newProduct)
    console.log(createdProduct)
    // Lấy bản ghi product sau khi gọi 

    const getNewProduct = await productModel.findOneById(createdProduct.insertedId)
    console.log(getNewProduct)
    //Trả kết quả về, luôn phải có return trong service
    return getNewProduct
  } catch (error) {
    throw error
  }
};

const getDetails = async (productId) => {
  try {
    const product = await productModel.findOneById(productId)
    if(!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found')
    }
    return product
  } catch (error) {
    throw error
  }
};

const getAll = async(req, res, next) => {
  try {
    return await productModel.getAll();
  } catch (error) {
    throw Error(error)
  }
}

export const productService = {
  createNew,
  getDetails,
  getAll
};
