import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

import { app } from './app';

// const createMemoryDb = async () => {
//   const mongo = await MongoMemoryServer.create();
//   const mongoUri = mongo.getUri();

//   console.log('mongo uri is ', mongoUri);

//   await mongoose.connect(mongoUri, {});
// }

const start = async () => {
  if (!process.env.JWT_SIGNING_KEY)
    throw new Error('JWT_SIGNING_KEY must be defined');
  if (!process.env.MONGO_URI)
    throw new Error('MONGO_URI must be defined');

    // await createMemoryDb();
  try {
    await mongoose.connect(process.env.MONGO_URI); // mongodb://auth-mongo-srv:27017/auth - '/auth' is name of db that will be created
    console.log('Connected to Mongo DB');
  } catch (e) {
    console.error('Error connecting to Mongo DB:', e);
  }

  // port doesn't really matter because k8s will handle this
  app.listen(3000, () => {
    console.log('auth listening on port 3000');
  });
};

start();


