import express, { Request, Response } from 'express';

import { Ticket } from '../models/ticket';
import { NotFoundError } from '@bobmccullough/gittix-common';

const router = express.Router();

router.get('/api/ticketing/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).send('Requested ticket does not exist.');
  }

  res.status(200).send(ticket);
});

export { router as showRouter };
