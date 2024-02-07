import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(201);
});

it('returns a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password123',
    })
    .expect(400);
});

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'a',
    })
    .expect(400);
});

it('returns a 400 with a missing password or email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password123',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400);
});

it('returns a 400 when same email is used to sign up twice', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(400);
});

it('Sets cookie header on successful signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(201);

    // needs cookie-session to be set to secure=false (via NODE_ENV)
    expect(res.get('Set-Cookie')).toBeDefined();
});
