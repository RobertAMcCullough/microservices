import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../errors/not-authorized-error';
import { UserPayload } from './current-user';

// currentUser middleware will always run before this, so req.currentUser will be set
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError('User is not authorized');
  }
  next();
};
