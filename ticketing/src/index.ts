import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_SIGNING_KEY)
    throw new Error('JWT_SIGNING_KEY must be defined');
  if (!process.env.MONGO_URI)
    throw new Error('MONGO_URI must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo DB / Ticketing');
  } catch (e) {
    console.log('Error connecting to Mongo DB:', e);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();
