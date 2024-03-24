import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

describe('update route handler', () => {
  it('has route handler listening to /api/ticketing for put requests', async () => {
    const res = await request(app).put('/api/ticketing/1234').send({});

    expect(res.statusCode).not.toBe(404);
  });

  it('can only be accessed if user signed in', async () => {
    const res = await request(app)
      .put('/api/ticketing/1234')
      .send({})
      .expect(401);

    expect(res.body[0].message).toBe('Not Authorized');
  });

  it('should not return 401 if user is signed in', async () => {
    const cookie = signin();
    const res = await request(app)
      .put('/api/ticketing/1234')
      .set('Cookie', cookie)
      .send({});

    expect(res.status).not.toBe(401);
  });

  it('returns error with invalid title', async () => {
    const res = await request(app)
      .put('/api/ticketing/1234')
      .set('Cookie', signin())
      .send({ title: '', price: 40 })
      .expect(400);

    expect(res.body[0].message).toBe('Invalid Title');
    expect(res.body[0].field).toBe('title');
  });

  it('returns error with invalid price', async () => {
    const res = await request(app)
      .put('/api/ticketing/1234')
      .set('Cookie', signin())
      .send({ title: 'Nirvana', price: 'asdf' })
      .expect(400);

    expect(res.body[0].message).toBe('Invalid Price');
    expect(res.body[0].field).toBe('price');
  });

  it('will return 404 if ticket does not exist', async () => {
    await request(app)
      .post('/api/ticketing')
      .set('Cookie', signin())
      .send({ title: 'Nirvana', price: '40' })
      .expect(201);

    let tickets = await Ticket.find();
    expect(tickets.length).toEqual(1);

    const res = await request(app)
      .put('/api/ticketing/65fdb0f6b42627f390782a9e')
      .set('Cookie', signin())
      .send({ title: 'New Title', price: '22' })
      .expect(404);

    expect(res.text).toBe('Requested ticket does not exist.');
  });

  it('will return 401 if ticket does not belong to user', async () => {
    await request(app)
      .post('/api/ticketing')
      .set('Cookie', signin(true))
      .send({ title: 'Nirvana', price: '40' })
      .expect(201);

    let tickets = await Ticket.find();
    expect(tickets.length).toEqual(1);

    expect(tickets[0].title).toBe('Nirvana');
    expect(tickets[0].price).toBe(40);
    expect(tickets[0].userId).toBe('33333');
    expect(tickets[0].id).toBeDefined();

    const res = await request(app)
      .put(`/api/ticketing/${tickets[0].id}`)
      .set('Cookie', signin())
      .send({ title: 'New Title', price: '22' })
      .expect(401);

    expect(res.body[0].message).toBe('Not Authorized');
  });

  it('updates a ticket when valid inputs provided', async () => {
    await request(app)
      .post('/api/ticketing')
      .set('Cookie', signin())
      .send({ title: 'Nirvana', price: '40' })
      .expect(201);

    let tickets = await Ticket.find();
    expect(tickets.length).toEqual(1);

    expect(tickets[0].title).toBe('Nirvana');
    expect(tickets[0].price).toBe(40);
    expect(tickets[0].userId).toBe('12345');
    expect(tickets[0].id).toBeDefined();

    const res = await request(app)
      .put(`/api/ticketing/${tickets[0].id}`)
      .set('Cookie', signin())
      .send({ title: 'New Title', price: '22' })
      .expect(200);

    tickets = await Ticket.find();
    expect(tickets.length).toEqual(1);

    expect(tickets[0].title).toBe('New Title');
    expect(tickets[0].price).toBe(22);
    expect(tickets[0].userId).toBe('12345');
    expect(tickets[0].id).toBeDefined();
  });
});
