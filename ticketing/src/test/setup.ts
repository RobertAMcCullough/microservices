import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import {} from 'jasmine'; // required for ts to find beforeAll, beforeEach, etc

import { app } from '../app';

declare global {
  var signin: (alternateUser?: boolean) => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_SIGNING_KEY = 'abcdefgh';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (alternateUser) => {
  const userInfo = {
    id: '12345',
    email: 'email address',
  };

  if (alternateUser) {
    userInfo.id = '33333';
  }

  const userJwt = jwt.sign(
    userInfo,
    process.env.JWT_SIGNING_KEY! // ! = definite assignment assertion - tell TS that it is definitely assigned a value by now
  );

  const cookieDataString = JSON.stringify({ jwt: userJwt });

  const encodedCookie = btoa(cookieDataString);

  return [`session=${encodedCookie}`];
};
