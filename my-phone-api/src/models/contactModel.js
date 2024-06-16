import Joi from 'joi'
import { ObjectId } from 'mongodb'
import objectId from 'joi-objectid'
import { GET_DB } from '~/config/mongodb'
const CONTACT_COLLECTION_NAME = 'contacts'
const CONTACT_COLLECTION_SCHEMA = Joi.object({
  userName : Joi.string().required().min(3).max(50).trim().strict(),
  emailAddress : Joi.string().email().required().min(3).max(50).trim().strict(),
  message : Joi.string().required().min(3).max(256).trim().strict()
})

const validateBeforeCreate = async (data) => {
  return await CONTACT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    // const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(CONTACT_COLLECTION_NAME).insertOne(await validateBeforeCreate(data))
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    console.log(id)
    const result = await GET_DB().collection(CONTACT_COLLECTION_NAME).findOne({
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
    const result = await GET_DB().collection(CONTACT_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getAll = async () => {
  try {
    const cursor = GET_DB().collection(CONTACT_COLLECTION_NAME).find();
    const results = await cursor.toArray();
    console.log('----------', results);
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

export const contactModel = {
  CONTACT_COLLECTION_NAME,
  CONTACT_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  getAll
}
