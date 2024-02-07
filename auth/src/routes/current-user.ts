import express, { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { UserPayload } from '../middlewares/current-user';

// import { generateSentence, generateSentenceNoProps, getArmLock } from 'random-bjj'

const router = express.Router();

router.get(
  '/api/users/currentuser',
  (req: Request, res: Response) => {
    // console.log('req.session')
    // console.log(req.session)

    // for TS, have to do this instead of req.session.testval = "..."
    //   req.session = {
    //     ...req.session,
    //     testval2:
    //       'stored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before reset',
    //     testval3:
    //       'stored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before reset',
    //     testval4:
    //       'stored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before resetstored before reset',
    //   };

    //   console.log(req.session);

    //   res.cookie('hiya', 'doodasfdasdfas');
    //   res.cookie('name', 'bob2', { httpOnly: true });
    //   res.cookie('secure', 'bob2', { httpOnly: true, secure: true });
    //   res.cookie('temp', 'bob2', { maxAge: 12000 });

    //   res.send(req.cookies);

    // these are equivalent
    //   const currentToken = JSON.parse(atob(req.cookies.session))?.jwt;
    //   const currentToken = req.session?.jwt;

    // console.log(getArmLock())

    // return res.send(generateSentence({personOne: 'joey'}))

    return res.send({currentUser: req.currentUser || null});
  }
);

export { router as currentUserRouter };


// this should only be required once per project, but skaffold is not able to find it 
// declare global {
//     namespace Express {
//       interface Request {
//         currentUser?: UserPayload;
//       //   session?: any;
//       }
//     }
//   }
  