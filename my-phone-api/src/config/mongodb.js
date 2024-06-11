// trandanhkiet160903
//kiet14137
const MONGODB_URI =
  'mongodb+srv://trandanhkiet160903:kiet14137@cluster0-smeap.j5gm89d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-Smeap';

const DATABASE_NAME = 'my-phone-api';

import { MongoClient, ServerApiVersion } from 'mongodb';

//Instance , lay database
let phoneApiInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () =>{
  //Call connection to mongoDB Atlas
  await mongoClientInstance.connect();

  phoneApiInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if(!phoneApiInstance) throw new Error('Must connect to Database first!')
    return phoneApiInstance
}
 

