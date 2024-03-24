import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const createTicket = async () => {
  await request(app)
    .post('/api/ticketing')
    .set('Cookie', signin())
    .send({ title: 'Nirvana', price: '40' });
};

describe('show route handler', () => {
  it('return an error if ticket does not exist', async () => {
    const res = await request(app).get('/api/ticketing/65fdb0f6b42627f390782a9e').send();

    expect(res.statusCode).not.toBe(200);
  });

  it('can fetch a ticket by id', async () => {
    await createTicket();

    const tickets = await Ticket.find()

    expect(tickets.length).toBe(1);

    const res = await request(app).get(`/api/ticketing/${tickets[0].id}`).send().expect(200);

    expect(res.body.title).toBe('Nirvana');
    expect(res.body.price).toBe(40);
  });
});
