import Joi from 'joi'
import { ObjectId } from 'mongodb'
import objectId from 'joi-objectid'
import { GET_DB } from '~/config/mongodb'
import { query } from 'express'
Joi.objectId = objectId(Joi)

// Define Collection(Name & schema)
const PRODUCT_COLLECTION_NAME = 'products'
const PRODUCT_COLLECTTION_SCHEMA = Joi.object({
  // id: Joi.objectId().required(),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  slug : Joi.string().required().min(3).trim().strict(),
  brand : Joi.string().required().min(1).max(50).trim().strict(),
  price : Joi.number().precision(2).required().strict(),
  reviews: Joi.array().items(Joi.object({
    reviewerName: Joi.string().min(1).max(50).trim().strict(),
    content : Joi.string().required().min(3).max(256).trim().strict(),
    email : Joi.string().email().min(3).max(50).trim().strict(),
    rating : Joi.number().min(1).max(5).integer().strict()
  })).default([]),

  thumbnail: Joi.string().required().min(1).max(256).trim().strict(),
  _destroy : Joi.boolean().default(false)
})
const PRODUCT_REVIEW_SCHEMA = Joi.object({
  reviewerName: Joi.string().required().min(1).max(50).trim().strict(),
  content: Joi.string().required().min(3).max(256).trim().strict(),
  email: Joi.string().email().min(3).max(50).trim().strict(),
  rating: Joi.number().min(1).max(5).integer().strict()
})

const validateBeforeCreate = async (data) => {
  return await PRODUCT_COLLECTTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const validateReview = async (data) => {
  return await PRODUCT_REVIEW_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    // const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(await validateBeforeCreate(data))
  } catch (error) {
    throw new Error(error)
  }
}

const putNewReview = async (productId, reviewData) => {
  try {
    // Validate review data
    console.log('im here 2')
    console.log(reviewData)
    await validateReview(reviewData);

    // Construct new review object
    const newReview = {
      ...reviewData,
      // Optionally add any additional fields here
    };
    console.log(productId, reviewData)
    // Update the product document to push new review into reviews array
    const result = await GET_DB().collection('products').updateOne(
      { _id: new ObjectId(productId) },
      { $push: { reviews: newReview } }
    );
    console.log(productId);
    if (result.modifiedCount === 0) {
      throw new Error('Failed to add review to product');
    }

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async ({ brand, _start, _limit }) => {
  try {
    //Aggregate
    const query = {};
    if (brand) {
      query.brand = brand;
    }
    const cursor = GET_DB().collection(PRODUCT_COLLECTION_NAME).find(query)
    if (_start !== undefined && _start !== null) {
      cursor.skip(parseInt(_start, 10));
    }
    if (_limit !== undefined && _limit !== null) {
      cursor.limit(parseInt(_limit, 10));
    }
    // console.log('Model ' + brand + ' _start ' + _start + ' _limit ' + _limit);
    const result = await cursor.toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}


export const productModel = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTTION_SCHEMA,
  createNew,
  putNewReview,
  findOneById,
  getAll
}