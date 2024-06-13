import Joi from 'joi'
import { ObjectId } from 'mongodb'
import objectId from 'joi-objectid'
import { GET_DB } from '~/config/mongodb'
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

const validateBeforeCreate = async (data) => {
  return await PRODUCT_COLLECTTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    // const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(await validateBeforeCreate(data))
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    console.log(id)
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async (id) => {
  try {
    //Aggregate
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find({}).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const productModel = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTTION_SCHEMA,
  createNew,
  findOneById,
  getAll
}