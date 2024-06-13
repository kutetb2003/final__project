import Joi from 'joi'
import { ObjectId } from 'mongodb'
import objectId from 'joi-objectid'
import { GET_DB } from '~/config/mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  username : Joi.string().required().min(1).max(50).trim().strict(),
  email : Joi.string().required().min(1).max(100).trim().strict(),
  password :  Joi.string().required().min(1).max(50).trim().strict(),
  role: Joi.string().required().min(1).max(50).trim().strict()
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    // const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(await validateBeforeCreate(data))
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    console.log(id)
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    //Aggregate
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails
}
