// want to export this so it can be used in test file without being automatically started in index.ts

import express from 'express';
import cp from 'cookie-parser';
import cookieSession from 'cookie-session'
import 'express-async-errors';
import { json } from 'body-parser';
import { NotFoundError, errorHandler, currentUser } from '@bobmccullough/gittix-common';

import { currentUserRouter } from './routes/current-user';
import { signinUserRouter } from './routes/signin';
import { signupUserRouter } from './routes/signup';
import { signoutUserRouter } from './routes/signout';

export const app = express();

app.set('trust proxy', true) // want express to trust https from ingres-nginx proxying traffic

app.use(json());
app.use(cp());

// cookie will have session information inside of it and will be base64 encoded
app.use(cookieSession({
  secure: process.env.NODE_ENV !== 'test',
  signed: false
}))

app.use(currentUser)

app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signupUserRouter);
app.use(signoutUserRouter);

// 1. this works
// app.all('*', (req, res) => {
//   throw new NotFoundError('error thrown from index.js :)')
// });

// 2. but if asynch, you'll need to use next()
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError('error thrown from index.js'))
// });

// 3. best option is to install express-async-errors which allows async to work without next()
app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler); // needs to go at end of app.use()'s