import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';

export interface UserPayload {
  id: string;
  email: string;
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    req.currentUser = Jwt.verify(
      req.session.jwt,
      process.env.JWT_SIGNING_KEY!
    ) as UserPayload;
  } catch (err: any) {}

  next();
};

// extending an already defined type
declare global {
    namespace Express {
      interface Request {
        currentUser?: UserPayload;
        session?: any;
      }
    }
  }
  