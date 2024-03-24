import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotAuthorizedError, requireAuth, validateRequest } from '@bobmccullough/gittix-common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/ticketing/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Invalid Title'),
    body('price').isFloat({ gt: 0 }).withMessage('Invalid Price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const userId = req.currentUser!.id;

    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).send('Requested ticket does not exist.');
    }

    if (ticket.userId !== userId) {
      throw new NotAuthorizedError('User does not own requested ticket');
    }

    ticket.set({ title, price })
    await ticket.save()

    res.status(200).send(ticket);
  }
);

export { router as updateRouter };
