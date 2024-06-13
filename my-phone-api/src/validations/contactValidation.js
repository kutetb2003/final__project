import Joi from 'joi';
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError';
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    fullName : Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required' : 'userName is required',
      'string.empty' : 'userName is not allowed to be empty'
    }),
    emailAddress : Joi.string().email().required().min(3).max(50).trim().strict(),
    message : Joi.string().required().min(3).max(256).trim().strict()
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

export const contactValidation = {
  createNew
}

