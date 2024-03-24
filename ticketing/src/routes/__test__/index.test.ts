import request from 'supertest';
import { app } from '../../app';

const createTicket = async () => {
  await request(app)
    .post('/api/ticketing')
    .set('Cookie', signin())
    .send({ title: 'Nirvana', price: '40' });
};

describe('index route handler', () => {
  it('has route handler listening to /api/ticketing for get requests', async () => {
    const res = await request(app).get('/api/ticketing').send();

    expect(res.statusCode).not.toBe(404);
  });

  it('can fetch a list of tickets', async () => {
    let res = await request(app).get('/api/ticketing').send().expect(200);

    expect(res.body.length).toBe(0);

    await createTicket();
    await createTicket();
    await createTicket();

    res = await request(app).get('/api/ticketing').send().expect(200);

    expect(res.body.length).toBe(3);
  });
});
