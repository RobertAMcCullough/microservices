import request from 'supertest';
import { app } from '../../app';

describe('Sign In Route Handler', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password123',
      })
      .expect(201);
  });
  it('Returns 401 on non-existant email', () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'wrong@test.com',
        password: 'password123',
      })
      .expect(400);
  });
  it('Returns 401 on wrong password', () => {
    return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password12345',
    })
    .expect(400);
  });
  it('Sets cookie on successful login', async () => {
    const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(200);

    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
