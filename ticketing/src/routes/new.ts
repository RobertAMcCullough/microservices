import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@bobmccullough/gittix-common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/ticketing',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Invalid Title'),
    body('price').isFloat({ gt: 0 }).withMessage('Invalid Price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const userId = req.currentUser!.id;

    const ticket = Ticket.build({ title, price, userId });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as newRouter };
