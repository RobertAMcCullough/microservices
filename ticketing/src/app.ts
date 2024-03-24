// want to export this so it can be used in test file without being automatically started in index.ts

import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  NotFoundError,
  errorHandler,
  currentUser,
} from '@bobmccullough/gittix-common';

import { newRouter } from './routes/new';
import { indexRouter } from './routes/index';
import { showRouter } from './routes/show';
import { updateRouter } from './routes/update';

export const app = express();

app.set('trust proxy', true); // want express to trust https from ingres-nginx proxying traffic

app.use(json());

app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false,
  })
);

app.use(currentUser);

//routes

app.use(newRouter);
app.use(updateRouter);
app.use(showRouter);
app.use(indexRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);
