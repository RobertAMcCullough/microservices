import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

describe('new route handler', () => {
  it('has route handler listening to /api/ticketing for post requests', async () => {
    const createTicketRes = await request(app).post('/api/ticketing').send({});

    expect(createTicketRes.statusCode).not.toBe(404);
  });

  it('can only be accessed if user signed in', async () => {
    const createTicketRes = await request(app)
      .post('/api/ticketing')
      .send({})
      .expect(401);

    expect(createTicketRes.body[0].message).toBe('Not Authorized');
  });

  it('should not return 401 if user is signed in', async () => {
    const cookie = signin();
    const createTicketRes = await request(app).post('/api/ticketing').set('Cookie', cookie).send({});

    expect(createTicketRes.status).not.toBe(401);
  });

  it('returns error with invalid title', async () => {
    const res = await request(app).post('/api/ticketing').set('Cookie', signin()).send({title: '', price: 40}).expect(400)

    expect (res.body[0].message).toBe('Invalid Title');
    expect (res.body[0].field).toBe('title');
  });

  it('returns error with invalid price', async () => {
    const res = await request(app).post('/api/ticketing').set('Cookie', signin()).send({title: 'Nirvana', price: 'asdf'}).expect(400)

    expect (res.body[0].message).toBe('Invalid Price');
    expect (res.body[0].field).toBe('price');
  });

  it('creates a ticket when valid inputs provided', async () => {
    let tickets = await Ticket.find();
    expect(tickets.length).toEqual(0);

    const res = await request(app).post('/api/ticketing').set('Cookie', signin()).send({title: 'Nirvana', price: '40'}).expect(201)

    tickets = await Ticket.find();
    expect(tickets.length).toEqual(1);

    expect(tickets[0].title).toBe('Nirvana');
    expect(tickets[0].price).toBe(40);
    expect(tickets[0].userId).toBe('12345');
    expect(tickets[0].id).toBeDefined();
  });
});
