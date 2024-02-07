import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signin',
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').trim().notEmpty().withMessage('Password required'),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const correctPassword = await Password.comparePasswords(
      user?.password || '',
      password
    );

    if (!correctPassword) {
      throw new Error('Invalid email or password');
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SIGNING_KEY! // ! = definite assignment assertion - tell TS that it is definitely assigned a value by now
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(user);
  }
);

export { router as signinUserRouter };


// // this should only be required once per project, but skaffold is not able to find it 
// declare global {
//     namespace Express {
//       interface Request {
//         session?: any;
//       }
//     }
//   }