import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import jwt from 'jsonwebtoken';

import { UserPayload } from '../middlewares/current-user';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

// middleware validation using body() from express-validator
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage('Invalid password length'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // this all moved to validateRequest middleware
    // // if validation errors, they will be appended to req object, so that is what is checked here
    // const errors = validationResult(req).array();

    // if (errors.length) {
    //   // res.status(400).send(errors)
    //   // instead we'll throw and an error and let error-handling middleware catch it
    //   throw new RequestValidationError(errors);
    // }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError(`${email} already in use.`);
    }

    const user = User.build({ email, password });
    await user.save();

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

    // user.toJSON = () => {
    //     return {
    //         id: user._id,
    //         email
    //     }
    // }

    res.status(201).send(user);
    // res.status(201).send(user)
  }
);

export { router as signupUserRouter };


// this should only be required once per project, but skaffold is not able to find it 
// declare global {
//     namespace Express {
//       interface Request {
//         currentUser?: UserPayload;
//         session?: any;
//       }
//     }
//   }
  