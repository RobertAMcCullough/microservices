import express, { Request, Response } from 'express';
import { requireAuth, UserPayload } from '@bobmccullough/gittix-common';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { router as signoutUserRouter };

// this should only be required once per project, but skaffold is not able to find it
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
      session?: any;
    }
  }
}
