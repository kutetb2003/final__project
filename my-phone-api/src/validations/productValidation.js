import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    brand: Joi.string().required().min(1).max(50).trim().strict(),
    price: Joi.number().precision(2).required().strict(),
    reviews: Joi.array()
      .items(
        Joi.object({
          reviewerName: Joi.string().required().min(1).max(50).trim().strict(),
          content: Joi.string().required().min(3).max(256).trim().strict(),
          email: Joi.string().email().min(3).max(50).trim().strict(),
          rating: Joi.number().min(1).max(5).integer().strict(),
        })
      )
      .default([]),

    thumbnail: Joi.string().required().min(1).max(256).trim().strict(),
    _destroy: Joi.boolean().default(false),
  });

  try {
    console.log("req.body:", req.body);
    // abortEarly : trường hợp nhiều lỗi , return tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    //Validate data done, req => controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const putNewReview = async (req, res, next) => {
  const correctCondition = Joi.object({
    reviewerName: Joi.string().required().min(1).max(50).trim().strict(),
    content: Joi.string().required().min(3).max(256).trim().strict(),
    email: Joi.string().email().min(3).max(50).trim().strict(),
    rating: Joi.number().min(1).max(5).integer().strict(),
  });
  try {
    console.log('req.body: valid', req.body);
    // abortEarly : trường hợp nhiều lỗi , return tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    console.log('valided');
    //Validate data done, req => controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const productValidation = {
  createNew,
  putNewReview,

};
