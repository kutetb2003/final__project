import Joi from 'joi';
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError';
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required' : 'username is required',
      'string.empty' : 'username is not allowed to be empty'
    }),
    email: Joi.string().email().required().min(3).max(50).trim().strict(),
    password: Joi.string().required().max(50).trim().strict(),
    role: Joi.string().required().max(50).trim().strict()
  })

  try {
    console.log('req.body:',req.body)
    // abortEarly : trường hợp nhiều lỗi , return tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    //Validate data done, req => controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const userValidation = {
  createNew
}
